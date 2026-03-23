console.log("LONGEST WORD FINDER APP\n");

function findLongestWordLength(sentence) {
  let longestWordLength = 0;
  const words = sentence.split(" ");
  for (const word of words) {
    if (word.length > longestWordLength) {
      longestWordLength = word.length;
    }
  }
  return longestWordLength;
}

console.log(`The longest word length in the sentence "The quick brown fox jumped over the lazy dog" is: ${findLongestWordLength("The quick brown fox jumped over the lazy dog")}
`);

console.log(`The longest word length in the sentence "May the force be with you" is: ${findLongestWordLength("May the force be with you")}
`);

console.log(`The longest word length in the sentence "Google do a barrel roll" is: ${findLongestWordLength("Google do a barrel roll")}
`);
 
console.log(`The longest word length in the sentence "Googling do a barrel roll" is: ${findLongestWordLength("Googling do a barrel roll")}
`);
 
console.log(`The longest word length in the sentence "What is the average airspeed velocity of an unladen swallow" is: ${findLongestWordLength("What is the average airspeed velocity of an unladen swallow")}
`);
 
console.log(`The longest word length in the sentence "What if we try a super-long word such as otorhinolaryngology" is: ${findLongestWordLength("What if we try a super-long word such as otorhinolaryngology")}
`);
