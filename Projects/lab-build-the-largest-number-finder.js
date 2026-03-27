console.log("Largest Number Finder" + "\n")

function largestOfAll(twoDArray) {
  const result = [];
  for (const subArray of twoDArray) {
    let largestNumber = subArray[0];
    for (let i = 0; i < subArray.length - 1; i++) {
      if (subArray[i + 1] > largestNumber) {
        largestNumber = subArray[i + 1];
      }
    }
    result.push(largestNumber);
  }
  return result;
}


console.log(`largestOfAll([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]):` + "\n");
console.log(largestOfAll([[13, 27, 18, 26], [4, 5, 1, 3], [32, 35, 37, 39], [1000, 1001, 857, 1]]));
console.log();

console.log(`largestOfAll([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]):` + "\n");
console.log(largestOfAll([[4, 9, 1, 3], [13, 35, 18, 26], [32, 35, 97, 39], [1000000, 1001, 857, 1]]));
console.log();

console.log(`largestOfAll([[17, 23, 25, 12], [25, 7, 34, 48], [4, -10, 18, 21], [-72, -3, -17, -10]]):` + "\n");
console.log(largestOfAll([[17, 23, 25, 12], [25, 7, 34, 48], [4, -10, 18, 21], [-72, -3, -17, -10]]));
console.log();

