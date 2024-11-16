const randomInRange = (min, max) => {
  return Math.floor(Math.random() * max + min);
};
let bulletNumber = randomInRange(1, 6);
let currentBullet = 0;
let currentRotation = 0;
let isShooting = false;

const shotAudio = new Audio("assets/audio/shot.mp3");
const reloadingAudio = new Audio("assets/audio/reloading.mp3");
const emptyShotAudio = new Audio("assets/audio/empty_shot.mp3");
const dhukdhukAudio = new Audio("assets/audio/dhukdhuk.mp3");
const shuffleAudio = new Audio("assets/audio/shuffle.mp3");
const chamber = document.getElementById("chamber");

window.onload = () => {
  document.body.style.width = window.innerWidth + "px";
  document.body.style.height = window.innerHeight + "px";
  document.getElementById("mainDiv").style.height =
    0.9 * window.innerHeight + "px";
};

// document.getElementById("startBtn").onclick = async () => {
//   emptyShotAudio.play()
//   document.getElementById("startBtn").style.display = "none";
//   for (const btn of document.getElementsByClassName("nonStart")) {
//     btn.style.display = "block";
//   }
// };

document.getElementById("randomCard").onclick = () => {
  let counter = 0;
  shuffleAudio.play();
  let cardShowInterval = setInterval(() => {
    let cardImage = document.getElementById("cardImage");
    cardImage.src = `assets/cards/${cards[counter % cards.length]}.png`;
    counter++;
  }, 100);
  setTimeout(() => {
    let cardImage = document.getElementById("cardImage");
    cardImage.src = `assets/cards/${cards[randomInRange(0, cards.length)]}.png`;
    clearInterval(cardShowInterval);
  }, 1000);
};

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
    isShooting = false;
  }, 2000); // waiting for the audio to finish
  changeBulletCount();
};

const increment = () => {
  if (bulletNumber === currentBullet || isShooting) {
    return;
  }
  reloadingAudio.play();
  dhukdhukAudio.play();
  currentRotation += 360 * 3;
  chamber.style.transform = `rotate(${currentRotation}deg)`;
  isShooting = true;
  for (const btn of document.getElementsByClassName("nonStart")) {
    btn.style.display = "none";
  }
  setTimeout(() => _increment(), 2500);
};
const _increment = () => {
  currentBullet++;

  if (bulletNumber === currentBullet) {
    // play sound
    document.getElementById("mainDiv").style.backgroundColor = "red";
    shotAudio.play();
  } else {
    document.getElementById("mainDiv").style.backgroundColor = "green";
    setTimeout(() => {
      document.getElementById("mainDiv").style.backgroundColor = "white";
      isShooting = false;
    }, 500);
    emptyShotAudio.play();
  }
  for (const btn of document.getElementsByClassName("nonStart")) {
    btn.style.display = "block";
  }
  changeBulletCount();
};
