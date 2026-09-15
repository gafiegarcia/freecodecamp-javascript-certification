// third attempt at insertion sort; I hope I get this right this time!

// the whole reason for the "?" operator is to pass errors to the guard below it instead.
function insertionSort(arr, start = 0, end = arr?.length) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  for (let i = start + 1; i < end; i++) {
    let j = i;
    const current = arr[j];

    while (j > start && arr[j - 1] > current) {
      arr[j] = arr[j - 1];
      j--;
    }

    arr[j] = current;
  }

  return arr;
}

console.log(insertionSort([5, 4, 33, 2, 8])); // [2, 4, 5, 8, 33]
