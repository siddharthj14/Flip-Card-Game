const cards = document.querySelectorAll(".card");
const array = [];
let first = "";
let n = 0;

cards.forEach((card) => {
  array[card.id] = card.innerHTML;
  console.log(array);
  card.innerHTML = "❔";

  card.addEventListener("click", () => {
    card.disabled = true;
    n++;
    card.innerHTML = array[card.id];
    console.log(n);
    if (n == 1) {
      first = card;
    }
    if (first.innerHTML == card.innerHTML && n == 2) {
      n = 0;
      console.log("win");
    } else if (n == 2) {
      n = 0;
      setTimeout(() => {
        first.innerHTML = "❔";
        card.innerHTML = "❔";
      }, 1000);
    }
  });
});
