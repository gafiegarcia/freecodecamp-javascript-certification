console.log("— Voting System —\n");

const poll = new Map();

const addOption = (option) => {
  if (!option) {
    return "Option cannot be empty.";
  }
  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }

  poll.set(option, new Set());
  return `Option "${option}" added to the poll.`;
};

const vote = (option, voterId) => {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  const optionSet = poll.get(option);
  const hasVoted = optionSet.has(voterId);

  if (hasVoted) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  optionSet.add(voterId);
  return `Voter ${voterId} voted for "${option}".`;
};

const displayResults = () => {
  let results = "Poll Results:";

  poll.forEach((voteSet, option) => {
    results += `\n${option}: ${voteSet.size} votes`;
  });

  return results;
};

console.log(addOption("One Piece"));
console.log(addOption("Naruto"));
console.log(addOption("Bleach"));
console.log();

console.log(vote("One Piece", "monkey-d-luffy46"));
console.log(vote("One Piece", "monkey-d-luffy46"));
console.log(vote("One Peace", "chopper66"));
console.log(vote("One Piece", "chopper66"));
console.log(vote("One Piece", "sasuke666"));
console.log(vote("Naruto", "sasuke666"));
console.log(vote("One Piece", "tsunade8"));
console.log(vote("Naruto", "tsunade8"));
console.log(vote("Bleach", "tsunade8"));
console.log();

console.log("Tallying...\n");
console.log(displayResults());

// nothing much to review here
// gpt noted that "while `optionSet` works, `voters` would communicate the meaning better".
