const arr = [1, 4, 2, 8, 345, 123, 43, 5364, 8, 54, 0, 783, 23, 35];

function quicksort(arr) {
  if (arr.length < 2) return arr;

  const pivot = arr[0];
  const less = [];
  const greater = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      less.push(arr[i]);
    } else {
      greater.push(arr[i]);
    }
  }

  return quicksort(less).concat(pivot).concat(quicksort(greater));
}

console.log(`quicksort on [${arr.join(", ")}]:`);
console.log(quicksort(arr));
