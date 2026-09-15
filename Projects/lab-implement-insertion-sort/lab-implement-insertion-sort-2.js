function insertionSort(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError("Expected an array");
  }

  for (let i = 1; i < arr.length; i++) {
    let j = i;

    while (arr[j - 1] > arr[j]) {
      console.log(`${arr[j - 1]} > ${arr[j]}`);
      [arr[j - 1], arr[j]] = [arr[j], arr[j - 1]];
      j--;
      console.log("j becomes:", j);
      console.log(`so now arr[j - 1]: ${arr[j - 1]} and arr[j]: ${arr[j]}`);
    }
  }

  return arr;
}

console.log(insertionSort([5, 4, 33, 2, 8])); // [2, 4, 5, 8, 33]
console.log([1][56]);
console.log([1][-1]);
