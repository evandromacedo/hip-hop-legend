// function removeTransition(e) {
//   if (e.propertyName !== 'transform') return;
//   e.target.classList.remove('playing');
// }

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  // key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

// const keys = Array.from(document.querySelectorAll('.key'));
// keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

//////////////////////////////////////////////////////////

var loopToggleButton = document.getElementById('loop-toggle'),
    loopSelect       = document.getElementById('loop-select'),
    loopAudio        = document.getElementById('loop-audio');

function loopToggle(e) {
  var loopName = loopSelect.value;

  if (!loopName) return;

  if (loopToggleButton.getAttribute("data-status") == "start") {
    loopAudio.src = "sounds/loop/" + loopName + ".wav";
    loopAudio.play();

    loopToggleButton.setAttribute("data-status", "pause");
    loopToggleButton.textContent = "Pause Loop";
  }
  else {
    loopAudio.pause();

    loopToggleButton.setAttribute("data-status", "start");
    loopToggleButton.textContent = "Start Loop";
  }
};

function resetAudio(e) {
  if (!loopAudio.paused) {
    loopAudio.pause();

    loopToggleButton.setAttribute("data-status", "start");
    loopToggleButton.textContent = "Start Loop";
  }
};

loopToggleButton.addEventListener('click', loopToggle);
loopSelect.addEventListener('change', resetAudio);
