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

window.onload = () => {
  document.body.style.width = window.innerWidth + "px";
  document.body.style.height = window.innerHeight + "px";
};

// document.getElementById("startBtn").onclick = async () => {
//   reloadingAudio.play()
//   currentRotation += 360 * 2;
//   chamber.style.transform = `rotate(${currentRotation}deg)`;
//   document.getElementById("startBtn").style.display = "none";
//   for (const btn of document.getElementsByClassName("nonStart")) {
//     btn.style.display = "block";
//   }
// };
const shootButton = document.getElementById("shootButton")

const questionMarkList = []
const reactionEmoji = [
  "🥱",
  "😳",
  "😨",
  "😰",
  "🫥",
  "🫡",
  "😵",
]
const positions = [
  { top: "34%", left: "22%" },
  { top: "66%", left: "22%" },
  { top: "82.5%", left: "50%" },
  { top: "66%", left: "78.5%" },
  { top: "34%", left: "78.5%" },
  { top: "17.5%", left: "50%" },
]
for (let i = 0; i < 6; i++) {
  const questionMark = document.createElement("img")
  questionMark.src = "assets/gui/question.png"
  const questionStyle = `
  width: 9rem;
  position: absolute;
  top: ${positions[i].top};
  left: ${positions[i].left};
  transform: translate(-50%, -50%);
`
  questionMark.style.cssText = questionStyle
  questionMarkList.push(questionMark)
  shootButton.appendChild(questionMark)
}

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

function updateGameElements() {
  document.getElementById("mainDiv").style.backgroundColor = "white";
  document.getElementById("emojiText").innerHTML = reactionEmoji[0]
  for (const questionMark of questionMarkList) {
    questionMark.src = "assets/gui/question.png";
    questionMark.style.display = "block";
  }
  for (const btn of document.getElementsByClassName("nonStart")) {
    btn.style.display = "none";
  }
  document.getElementById("reloadingText").style.display = "block";
}

const reset = () => {
  reloadingAudio.play();
  isShooting = false;
  currentBullet = 0;
  bulletNumber = randomInRange(1, 6);
  currentRotation = 360 * 3;
  shootButton.style.transform = `rotate(${currentRotation}deg)`;

  updateGameElements();

  // After sound
  setTimeout(() => {
    document.getElementById("reloadingText").style.display = "none";
    changeBulletCount();

    // Setting to 0 without transition
    currentRotation = 0
    shootButton.classList.add("disable-transition");
    shootButton.style.transform = `rotate(${currentRotation}deg)`;
    // 
  }, 2000);

  setTimeout(() => {
    shootButton.classList.remove("disable-transition");
  }, 2020);
};

const increment = () => {
  if (bulletNumber === currentBullet || isShooting) {
    return;
  }
  // reloadingAudio.play();
  dhukdhukAudio.play();
  document.getElementById("emojiText").innerHTML = "🫣"
  currentRotation += 60;
  shootButton.style.transform = `rotate(${currentRotation}deg)`;
  isShooting = true
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
    questionMarkList[currentBullet - 1].src = "assets/gui/bullet.png"
    document.getElementById("emojiText").innerHTML = "😵"
    shotAudio.play();
  } else {
    document.getElementById("mainDiv").style.backgroundColor = "green";
    setTimeout(() => {
      document.getElementById("mainDiv").style.backgroundColor = "white";
      document.getElementById("emojiText").innerHTML = reactionEmoji[currentBullet]
      isShooting = false
      questionMarkList[currentBullet - 1].style.display = "none"
    }, 500);
    emptyShotAudio.play();
  }
  for (const btn of document.getElementsByClassName("nonStart")) {
    btn.style.display = "block";
  }
  changeBulletCount();
};
