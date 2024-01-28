const cards = document.querySelectorAll(".card");
const refresh = document.querySelector(".refresh");
const emojis = [
  "💎",
  "🎲",
  "🎭",
  "🌟",
  "🔊",
  "💎",
  "💰",
  "🎀",
  "🔫",
  "🌟",
  "🎀",
  "🎭",
  "💰",
  "🎲",
  "🔫",
  "🔊",
];
let shuffledEmojis = shuffleArray(emojis);
let flipsCount = 0;
let match = 0;
let clickLock = false;
let seconds = 0;
let minutes = 0;
let intervalId;
playGame();
startTimer();

refresh.addEventListener("click", () => {
  resetGame();
  playGame();
});

function playGame() {
  cards.forEach((card, index) => {
    card.textContent = "❔";
    card.addEventListener("click", () => handleCardClick(card, index));
  });
}

function handleCardClick(card, index) {
  if (clickLock) return;

  flipsCount++;
  document.querySelector(".flipsCount").textContent++;
  card.textContent = shuffledEmojis[index];

  if (flipsCount === 1) {
    card.disabled = true;
    firstCard = card;
  } else if (flipsCount === 2) {
    card.disabled = true;
    secondCard = card;
    clickLock = true;
    matchCards(firstCard, secondCard);
    flipsCount = 0;
  }
}

function matchCards(card1, card2) {
  if (card1.textContent === card2.textContent) {
    match++;
    if (match === emojis.length / 2) {
      alert("Congratulations! You've matched all pairs.");
    }
    clickLock = false;
  } else {
    setTimeout(() => {
      resetCard(card1);
      resetCard(card2);
      clickLock = false;
    }, 1000);
  }
}

function resetCard(card) {
  card.textContent = "❔";
  card.disabled = false;
}

function startTimer() {
  intervalId = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    const formattedTime = `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
    document.querySelector(".timeCount").innerHTML = formattedTime;
  }, 1000);
}

function resetGame() {
  match = 0;
  shuffledEmojis = shuffleArray(emojis);
  seconds = 0;
  minutes = 0;
  document.querySelector(".flipsCount").textContent = 0;
  flipsCount = 0;
  clickLock = false;
  cards.forEach((card, index) => {
    card.textContent = "❔";
    card.disabled = false;
    card.removeEventListener("click", () => handleCardClick(card, index));
  });
  playGame();
}

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
