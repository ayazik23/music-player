let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");
let shuffle_btn = document.querySelector(".shuffle-track");
let shuffledIndexes = [];

let volume_slider = document.querySelector(".volume_slider");
let volume_icon = document.querySelector(".volume-icon");


let seek_slider = document.querySelector(".seek_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
  {
    name: "Asylym",
    artist: "Prince",
    image: "images/Prince.jpeg",
    path: "songs/Asylym.mp3"
  },
  {
    name: "Ken dala",
    artist: "Dashxx",
    image: "images/Dashxx.jpg",
    path: "songs/Ken dala.mp3"
  },

  {
    name: "Posle dozhdya",
    artist: "Prince",
    image: "images/Prince.jpeg",
    path: "songs/Posle dozhdya.mp3"
  },

  {
    name: "Vsegda byl takim",
    artist: "Dashxx",
    image: "images/Dashxx.jpg",
    path: "songs/Vsegda byl takim.mp3"
  },

  {
    name: "Zhelsiz Tunde",
    artist: "Dashxx",
    image: "images/Dashxx.jpg",
    path: "songs/Zhelsiz Tunde.mp3"
  },
];

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.src = track_list[track_index].image;
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '&#x23f5;'; 
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '&#x23f8;'; 
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length - 1;
  loadTrack(track_index);
  playTrack();
}

function shuffleArray(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  
  function shuffleTracks() {
    shuffledIndexes = shuffleArray(Array.from({ length: track_list.length }, (_, index) => index));
    track_index = shuffledIndexes[0];
    loadTrack(track_index);
    playTrack();
  }
  
  shuffle_btn.addEventListener("click", shuffleTracks);

  curr_track.volume = 0.5;

  function toggleMute() {
    if (curr_track.volume === 0) {
      curr_track.volume = 0.5;
      volume_icon.innerHTML = "&#128266;"; 
    } else {
      curr_track.volume = 0;
      volume_icon.innerHTML = "&#128263;"; 
    }
  }

  function setVolume() {
    let volume_value = volume_slider.value / 100;
    curr_track.volume = volume_value;
  
    if (volume_value === 0) {
      volume_icon.innerHTML = "&#128263;"; 
    } else {
      volume_icon.innerHTML = "&#128266;"; 
    }
  }
  
  volume_slider.addEventListener("input", setVolume);
  volume_icon.addEventListener("click", toggleMute);

function seekUpdate() {
  let seekPosition = curr_track.currentTime / curr_track.duration * 100;
  seek_slider.value = seekPosition;

  let currentMinutes = Math.floor(curr_track.currentTime / 60);
  let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
  let durationMinutes = Math.floor(curr_track.duration / 60);
  let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

  currentMinutes = currentMinutes < 10 ? "0" + currentMinutes : currentMinutes;
  currentSeconds = currentSeconds < 10 ? "0" + currentSeconds : currentSeconds;
  durationMinutes = durationMinutes < 10 ? "0" + durationMinutes : durationMinutes;
  durationSeconds = durationSeconds < 10 ? "0" + durationSeconds : durationSeconds;

  curr_time.textContent = currentMinutes + ":" + currentSeconds;
  total_duration.textContent = durationMinutes + ":" + durationSeconds;
}

playpause_btn.addEventListener("click", playpauseTrack);
next_btn.addEventListener("click", nextTrack);
prev_btn.addEventListener("click", prevTrack);
seek_slider.addEventListener("input", seekTo);

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}
