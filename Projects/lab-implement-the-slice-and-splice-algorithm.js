console.log("FrankenSplice" + "\n");

function frankenSplice(arr1, arr2, index) {
  const result = [...arr2];
  result.splice(index, 0, ...arr1);
  return result;
}

console.log(`frankenSplice([1, 2, 3], [4, 5], 1):`);
console.log(frankenSplice([1, 2, 3], [4, 5], 1));
console.log();

console.log(`frankenSplice([1, 2], ["a", "b"], 1):`);
console.log(frankenSplice([1, 2], ["a", "b"], 1));
console.log();

console.log(`frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2):`);
console.log(frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2));
console.log();

console.log(`frankenSplice([1, 2, 3, 4], [], 0):`);
console.log(frankenSplice([1, 2, 3, 4], [], 0));
console.log();
