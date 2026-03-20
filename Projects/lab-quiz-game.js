console.log("Quiz Game!\n");

// The questions below are AI-generated; I don't have time making up random questions, lol

const questions = [
  {
    category: "Science",
    question: "What planet is known as the Red Planet?",
    choices: ["Venus", "Mars", "Jupiter"],
    answer: "Mars"
  },
  {
    category: "Geography",
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    category: "History",
    question: "In what year did the Berlin Wall fall?",
    choices: ["1987", "1989", "1991"],
    answer: "1989"
  },
  {
    category: "Technology",
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Layout"],
    answer: "Hyper Text Markup Language"
  },
  {
    category: "Nature",
    question: "What gas do plants absorb from the atmosphere?",
    choices: ["Oxygen", "Nitrogen", "Carbon Dioxide"],
    answer: "Carbon Dioxide"
  },
];

function getRandomQuestion(arr) {
  const randomObjectIndex = Math.floor(Math.random() * arr.length);
  return arr[randomObjectIndex];
};

const randomQuestion = getRandomQuestion(questions)
console.log("Random question:");
console.log(randomQuestion);
console.log();

function getRandomComputerChoice(choices) {
  const randomChoiceIndex = Math.floor(Math.random() * choices.length);
  return choices[randomChoiceIndex];
}

const randomComputerChoice = getRandomComputerChoice(randomQuestion.choices);
console.log(`Random answer: ${randomComputerChoice}`);
console.log();

function getResults(randomQuestion, randomComputerChoice) {
  return randomQuestion.answer === randomComputerChoice
    ? "The computer's choice is correct!"
    : `The computer's choice is wrong. The correct answer is: ${randomQuestion.answer}`
}

const result = getResults(randomQuestion, randomComputerChoice);
console.log(result);
