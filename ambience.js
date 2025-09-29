const audio = new Audio('ambience.mp3');
audio.loop = true;
audio.volume = 0.5;

window.addEventListener('DOMContentLoaded', () => {
  audio.play().catch(() => {
    console.log('User interaction required to start audio');
  });
});

document.addEventListener('click', () => {
  if (audio.paused) audio.play();
});
