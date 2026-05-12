console.log("— Symmetric Difference Function —\n");

function diffArray(array1, array2) {
  return [
    ...array1.filter(item => !array2.includes(item)),
    ...array2.filter(item => !array1.includes(item))
  ];

  // previous solution
  // let result = [];
  // result.push(...array1.filter(item => !array2.includes(item)));
  // result.push(...array2.filter(item => !array1.includes(item)));
  // return result;
}

console.log(`diffArray(["car", "bike", "bus"], ["bike", "train", "plane", "bus"]):`);
console.log(diffArray(["car", "bike", "bus"], ["bike", "train", "plane", "bus"]));

// Claude opus-4-7 notes:
// 1. Performance characteristic — O(n × m)
  // use `Set`; A Set has near-O(1) lookups
// 2. Modern alternative — Set.prototype.symmetricDifference()

// none of those were learned, but good to keep in mind for when I need a symmetric difference function