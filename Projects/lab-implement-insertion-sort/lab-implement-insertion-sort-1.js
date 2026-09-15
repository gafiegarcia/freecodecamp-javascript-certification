function insertionSort(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];

    for (let j = i; j >= 0; j--) {
      if (j === 0) {
        arr.splice(i, 1);
        arr.unshift(current);
        break;
      }

      if (arr[j - 1] < arr[i]) {
        if (j === i) {
          break;
        }

        arr.splice(i, 1);
        arr.splice(j, 0, current);
        break;
      }
    }
  }

  return arr;
}

const arr = [1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92];

console.log(insertionSort(arr));
console.log(insertionSort([5, 4, 33, 2, 8])); // [2, 4, 5, 8, 33]