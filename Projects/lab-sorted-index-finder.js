"use strict"

console.log("—— Sorted Index Finder ——\n");

function getIndexToIns(array, number) {
  array.sort((a, b) => a - b);
  const indexIns = array.findIndex(indexValue => indexValue >= number)
  if (indexIns === -1) {
    return array.length;
  } else {
    return indexIns;
  }
  
}

// fcc tests
console.log("getIndexToIns([1, 2, 3, 4], 1.5):");
console.log(getIndexToIns([1, 2, 3, 4], 1.5));

console.log("getIndexToIns([20, 3, 5], 19)");
console.log(getIndexToIns([20, 3, 5], 19));

console.log("getIndexToIns([3, 10, 5], 11)");
console.log(getIndexToIns([3, 10, 5], 11));

console.log("getIndexToIns([], 5)");
console.log(getIndexToIns([], 5));

// refactor attempt #1 feat. claude code
// this is still adhering to the user story (using `sort`, using `findIndex`)

// function getIndexToIns(array, number) {
//   const indexIns = [...array]
//     .sort((a, b) => a - b)
//     .findIndex(indexValue => indexValue >= number);
//   return indexIns === -1
//     ? array.length
//     : indexIns;  
// }

// the more elegant way to do this is.... 
// to not use `sort` at all.

// it's possible to just count all the array items 
// that are < the arg number, and return the length
// (not <=, but <, because the instruction is 
// to return *the lowest index*)

// user story:
// In this lab you will create a function that 
// returns the lowest index at which a value should
// be inserted into an array once it has been sorted
// in ascending order.


// technically: using filter().length
// const getIndexToIns = (array, number) =>
//   array.filter(v => v < number).length;
