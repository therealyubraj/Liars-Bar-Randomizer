const randomInRange = (min, max) => {
  return Math.floor(Math.random() * max + min);
};
let bulletNumber = randomInRange(1, 6);
let currentBullet = 0;

window.onload = () => {
  console.log("div", document.getElementById("mainDiv"));
  document.body.style.width = window.innerWidth + "px";
  document.body.style.height = window.innerHeight + "px";
  document.getElementById("mainDiv").style.height =
    0.9 * window.innerHeight + "px";
};

const shotAudio = new Audio("shot.mp3");
const reloadingAudio = new Audio("reloading.mp3");
const emptyShotAudio = new Audio("empty_shot.mp3");

const reset = () => {
  console.log("reset");
  reloadingAudio.play();
  bulletNumber = randomInRange(1, 6);
  currentBullet = 0;
  document.getElementById("mainDiv").style.backgroundColor = "white";
};

const increment = () => {
  console.log("increment", currentBullet, bulletNumber);
  if (bulletNumber === currentBullet) {
    return;
  }

  currentBullet++;

  if (bulletNumber === currentBullet) {
    // play sound
    console.log("DEAD");
    document.getElementById("mainDiv").style.backgroundColor = "red";
    shotAudio.play();
  } else {
    emptyShotAudio.play();
  }
};
