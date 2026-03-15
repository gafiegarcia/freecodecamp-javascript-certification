const fortune1 = "A mouse will enter your room when you're working on a deadline";
const fortune2 = "Beware of cute cats heading your way all day."
const fortune3 = "You will get a gig and get paid upront tomorrow.";
const fortune4 = "You should check under your bed...";
const fortune5 = "In the most unexpected place, you'll find your soulmate."

const min = 1;
const max = 5;
const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);

let selectedFortune;
if (randomNumber == 1) {
  selectedFortune = fortune1;
} else if (randomNumber == 2) {
  selectedFortune = fortune2;
} else if (randomNumber == 3) {
  selectedFortune = fortune3;
} else if (randomNumber == 4) {
  selectedFortune = fortune4;
} else if (randomNumber == 5) {
  selectedFortune = fortune5;
}
console.log(selectedFortune);