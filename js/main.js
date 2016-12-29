(function() {
  /*
    Thanks to Wes Bos for the algorithm <3
  */
  function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  function playBeat(e) {
    var audio = document.querySelector("audio[data-key='" + e.keyCode + "']"),
        key = document.querySelector(".key[data-key='" + e.keyCode + "']");

    if (!audio) return;

    if (!key.classList.contains('key-disco')) {
      key.classList.add('playing');
    }

    audio.currentTime = 0;
    audio.play();
  }

  var keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(function(key) { key.addEventListener('transitionend', removeTransition) });
  window.addEventListener('keydown', playBeat);

  /*
    Awkward, bad and messy code of mine
  */
  var disco1           = document.querySelector(".key[data-key='69'] > .disco"),
      disco2           = document.querySelector(".key[data-key='85'] > .disco"),
      loopAudio        = document.getElementById('loop-audio'),
      loopSelect       = document.getElementById('loop-select'),
      loopToggleButton = document.getElementById('loop-toggle-button');

  function loopToggle(e) {
    var loopName = loopSelect.value;

    if (!loopName) return;

    if (loopToggleButton.getAttribute("data-status") == "start") {
      loopAudio.src = "sounds/loop/" + loopName + ".wav";
      loopAudio.play();
      setButtonValue("pause");
      disco1.classList.add('rotating-clockwise');
      disco2.classList.add('rotating-anticlockwise');
    }
    else {
      loopAudio.pause();
      setButtonValue("start");
      disco1.classList.remove('rotating-clockwise');
      disco2.classList.remove('rotating-anticlockwise');
    }
  };

  function resetAudio(e) {
    if (!loopAudio.paused) {
      loopAudio.pause();
      setButtonValue("start");
      disco1.classList.remove('rotating-clockwise');
      disco2.classList.remove('rotating-anticlockwise');
    }
  };

  function setButtonValue(status) {
    loopToggleButton.setAttribute("data-status", status);
    loopToggleButton.textContent = status.charAt(0).toUpperCase() + status.slice(1) + " Loop";
  }

  loopToggleButton.addEventListener('click', loopToggle);
  loopSelect.addEventListener('change', resetAudio);

  // Modal Stuff
  var modal       = document.getElementById("modal"),
      aboutButton = document.querySelector(".about"),
      closeButton = document.querySelector(".close");

  function openModal() {
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function closeModalClick(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }

  aboutButton.addEventListener('click', openModal);
  closeButton.addEventListener('click', closeModal);
  window.addEventListener('click', closeModalClick);

  // Generate random background
  (function() {
    var randomNumber = Math.floor(Math.random() * 5) + 1;
    document.documentElement.style.backgroundImage = "url(img/background/" + randomNumber + ".jpg)";
  }());
}());
