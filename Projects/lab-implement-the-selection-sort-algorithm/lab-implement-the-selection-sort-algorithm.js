console.log("—— Selection Sort Algorithm! ——\n");

function selectionSort(arr) {
  // intentionally adding type check, just for fun
  if (!Array.isArray(arr)) throw new TypeError();

  // also intentionally making this a non-mutating function, just for fun
  const result = [...arr];

  for (let i = 0; i < arr.length - 1; i++) {
    let min = [i, result[i]];

    for (let j = i + 1; j <= arr.length - 1; j++) {
      if (result[j] < min[1]) {
        min = [j, result[j]];
      }
    }

    [result[i], result[min[0]]] = [min[1], result[i]];
  }

  return result;
}

const arr = [
  1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92,
];
console.log("Array length: ");
console.log(arr.length);
console.log();

const sortedArr = selectionSort(arr);
console.log("Sorted array: ");
console.log(sortedArr);
console.log();

console.log("Sorted array length: ");
console.log(sortedArr.length);

// post-review retry!
function selectionSortRetry(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  for (let i = 0; i < arr.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }

  return arr;
}
