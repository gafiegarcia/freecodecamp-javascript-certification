console.log("Chunky Monkey Algorithm" + "\n");

function chunkArrayInGroups(array, chunkSize) {
  if (chunkSize > array.length) {
    console.log("Error: chunk size is larger than the array's length");
    return;
  }

  const chunkedArray = [];
  for (let i = 0; i < array.length; i+= chunkSize) {
    chunkedArray.push(array.slice(i, i + chunkSize));
  }

  return chunkedArray;
}

console.log("chunkArrayInGroups([\"a\", \"b\", \"c\", \"d\"], 2):")
console.log(chunkArrayInGroups(["a", "b", "c", "d"], 2));
console.log();

console.log(`chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3):`)
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 3));
console.log();

console.log(`chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2):`)
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 2));
console.log();

console.log(`chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4):`)
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4));
console.log();

console.log(`chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3):`)
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6], 3));
console.log();

console.log(`chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4):`)
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 4));
console.log();

console.log(`chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2):`)
console.log(chunkArrayInGroups([0, 1, 2, 3, 4, 5, 6, 7, 8], 2));
console.log();
