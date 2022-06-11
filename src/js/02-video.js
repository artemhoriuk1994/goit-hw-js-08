import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

function updateTime(data) {
  if (data.seconds === data.duration) {
    return localStorage.removeItem(LOCALSTORAGE_KEY);
  }
  localStorage.setItem(LOCALSTORAGE_KEY, data.seconds);
}

function onPageReload() {
  const currentTime = localStorage.getItem(LOCALSTORAGE_KEY);
  if (currentTime) {
    player.setCurrentTime(currentTime);
  }
}

player.on('timeupdate', throttle(updateTime, 1000));
onPageReload();
