const cards = document.querySelectorAll(".card");
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
let flipsCount = 0;
let firstCard = null;
let secondCard = null;
let match = 0;
let clickLock = false;

const shuffledEmojis = shuffleArray(emojis);

cards.forEach((card, index) => {
  card.textContent = "❔";
  card.addEventListener("click", () => {
    if (clickLock) return;
    flipsCount++;
    card.textContent = shuffledEmojis[index];
    if (flipsCount === 1) {
      firstCard = card;
      firstCard.disabled = true;
    } else if (flipsCount === 2) {
      secondCard = card;
      clickLock = true;
      matchCards(firstCard, secondCard);
      flipsCount = 0;
    }
  });
});

function shuffleArray(array) {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
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
      card1.textContent = "❔";
      card2.textContent = "❔";
      card1.disabled = false;
      clickLock = false;
    }, 1000);
  }
}
