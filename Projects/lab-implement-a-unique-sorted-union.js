console.log("Unique Sorted Union (?)" + "\n");

function uniteUnique(...arrays) {
  const result = [];
  for (let i = 0; i < arrays.length; i++) {
    for (let j = 0; j < arrays[i].length; j++) {
      if (!result.includes(arrays[i][j])) {
        result.push(arrays[i][j]);
      }
    }
  }
  return result;
}

// tests
console.log(`uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]):`);
console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
console.log();

console.log(`uniteUnique([1, 2, 3], [5, 2, 1]):`);
console.log(uniteUnique([1, 2, 3], [5, 2, 1]));
console.log();

console.log(`uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]):`);
console.log(uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]));
console.log();

console.log(`uniteUnique([1, 3, 2], [5, 4], [5, 6]):`);
console.log(uniteUnique([1, 3, 2], [5, 4], [5, 6]));
console.log();

console.log(`uniteUnique([1, 3, 2, 3], [5, 2, 1, 4], [2, 1]):`);
console.log(uniteUnique([1, 3, 2, 3], [5, 2, 1, 4], [2, 1]));
console.log();
