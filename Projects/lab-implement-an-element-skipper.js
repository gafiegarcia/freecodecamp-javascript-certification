console.log ("Element Skipper" + "\n");

function dropElements(arr, func) {
  for (const [i, element] of arr.entries()) {
    if (func(element)) {
      return arr.slice(i);
    }
  }
  return [];
}

// tests
console.log(`dropElements([1, 2, 3, 4], function(n) {return n >= 3;}):`);
console.log(dropElements([1, 2, 3, 4], function(n) {return n >= 3;}));
console.log();

console.log(`dropElements([0, 1, 0, 1], function(n) {return n === 1;}):`);
console.log(dropElements([0, 1, 0, 1], function(n) {return n === 1;}));
console.log();

console.log(`dropElements([1, 2, 3], function(n) {return n > 0;}):`);
console.log(dropElements([1, 2, 3], function(n) {return n > 0;}));
console.log();

console.log(`dropElements([1, 2, 3, 4], function(n) {return n > 5;}):`);
console.log(dropElements([1, 2, 3, 4], function(n) {return n > 5;}));
console.log();

console.log(`dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;}):`);
console.log(dropElements([1, 2, 3, 7, 4], function(n) {return n > 3;}));
console.log();

console.log(`dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;}):`);
console.log(dropElements([1, 2, 3, 9, 2], function(n) {return n > 2;}));
console.log();
