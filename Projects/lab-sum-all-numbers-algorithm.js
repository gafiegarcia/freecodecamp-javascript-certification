console.log("Sum All Numbers!" + "\n");

function sumAll(arr = [2, 4]) {
  // type check + length check
  if (!Array.isArray(arr) || arr.length !== 2) {
    console.log("Input an array consisting of two numbers!");
    return;
  }

  const numberRange = arr.slice();

  // force numberRange to be in ascending order
  if (numberRange[0] > numberRange[1]) {
    const temp = numberRange[0];
    numberRange.splice(0, 1, numberRange[1]);
    numberRange.splice(1, 1, temp);
  }

  let sum = 0;
  for (let i = numberRange[0]; i <= numberRange[1]; i++) {
    sum += i;
  }

  return sum;
}

// tests
console.log(`sumAll([1, 4]):`);
console.log(sumAll([1, 4]));
console.log();

console.log(`sumAll([4, 1]):`);
console.log(sumAll([4, 1]));
console.log();

console.log(`sumAll([5, 10]):`);
console.log(sumAll([5, 10]));
console.log();

console.log(`sumAll([10, 5]):`);
console.log(sumAll([10, 5]));
console.log();


/* 
post-submit notes:

1. could've removed line 10-17 with this one-liner:
const numberRange = [Math.min(...arr), Math.max(...arr)];
2. OR EVEN BETTER, replace line 10-22 with:
```js
const [start, end] = [Math.min(...arr), Math.max(...arr)];
let sum = 0;
for (let i = start; i <= end; i++) {
  sum += i;
}
*/