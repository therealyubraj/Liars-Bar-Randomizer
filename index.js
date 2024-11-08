const randomInRange = (min, max) => {
  return Math.floor(Math.random() * max + min);
};
let bulletNumber = randomInRange(1, 6);
let currentBullet = 0;

window.onload = () => {
  document.body.style.width = window.innerWidth + "px";
  document.body.style.height = window.innerHeight + "px";
  document.getElementById("mainDiv").style.height =
    0.9 * window.innerHeight + "px";
};

document.getElementById("startBtn").onclick = async () => {
  reloadingAudio.play();
  document.getElementById("startBtn").style.display = "none";
  setTimeout(() => {
    for (const btn of document.getElementsByClassName("nonStart")) {
      btn.style.display = "block";
    }
  }, 2000); // waiting for the audio to finish
};

document.getElementById("randomCard").onclick = () => {
  document.getElementById("random").innerHTML = "0_o";
  setTimeout(() => {
    document.getElementById("random").innerHTML =
      cards[Math.floor(Math.random() * cards.length)];
  }, 500);
};

const shotAudio = new Audio("shot.mp3");
const reloadingAudio = new Audio("reloading.mp3");
const emptyShotAudio = new Audio("empty_shot.mp3");
const dhukdhukAudio = new Audio("dhukdhuk.mp3");

const cards = ["A", "K", "Q"];
const changeBulletCount = () => {
  document.getElementById("bulletCount").innerHTML = `${currentBullet} / 6`;
};

const reset = () => {
  reloadingAudio.play();
  bulletNumber = randomInRange(1, 6);
  currentBullet = 0;
  document.getElementById("mainDiv").style.backgroundColor = "white";
  document.getElementById("reloadingText").style.display = "block";
  for (const btn of document.getElementsByClassName("nonStart")) {
    btn.style.display = "none";
  }
  setTimeout(() => {
    for (const btn of document.getElementsByClassName("nonStart")) {
      btn.style.display = "block";
    }
    document.getElementById("reloadingText").style.display = "none";
  }, 2000); // waiting for the audio to finish
  changeBulletCount();
};

const increment = () => {
  dhukdhukAudio.play();
  setTimeout(() => _increment(), 3500);
};
const _increment = () => {
  if (bulletNumber === currentBullet) {
    return;
  }

  currentBullet++;

  if (bulletNumber === currentBullet) {
    // play sound
    document.getElementById("mainDiv").style.backgroundColor = "red";
    shotAudio.play();
  } else {
    document.getElementById("mainDiv").style.backgroundColor = "green";
    setTimeout(() => {
      document.getElementById("mainDiv").style.backgroundColor = "white";
    }, 500);
    for (const btn of document.getElementsByClassName("nonStart")) {
      btn.style.display = "none";
    }
    setTimeout(() => {
      for (const btn of document.getElementsByClassName("nonStart")) {
        btn.style.display = "block";
      }
    }, 500); // waiting for the audio to finish
    emptyShotAudio.play();
  }
  changeBulletCount();
};
