// Turns out my "ultimate" attempt failed at being the "ultimate" implementation.
// It hits O(n²) on reverse sorted and organ pipe shaped, due to partitioning.
// I pray that I succeed now in one go
//
// The easy fix is to let smaller lists be handled by insertionSort
// But I don't want that — too easy, let me try to retrace what I just wrote
// and try to handle array with length of 2
// oh wait, I already did when I expanded the "second base case" with simple `swap()`

// [TODO] delete when confirmed to be unused
// function smallerIdx(arr, a, b) {
//   if (arr[a] < arr[b]) return a;
//   return b;
// }

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function sortMedianOfThree(arr, start, end) {
  const middle = Math.floor((start + end) / 2);
  if (arr[start] > arr[middle]) {
    swap(arr, start, middle);
  }
  if (arr[middle] > arr[end - 1]) {
    swap(arr, middle, end - 1);
  }
  if (arr[start] > arr[middle]) {
    swap(arr, start, middle);
  }
  return middle;
}

function quicksort(arr, start = 0, end = arr.length) {
  if (end - start < 2) return arr;
  // [TODO] delete if confirmed the case of list of two is handled fine
  // if (end - start === 2) {
  //   if (arr[start] > arr[end - 1]) {
  //     swap(arr, start, end - 1);
  //   }
  //   return arr;
  // }

  const middle = sortMedianOfThree(arr, start, end);
  const pivot = arr[middle];

  // initial swap. pivot lives next to start during the loop
  swap(arr, start + 1, middle);

  let boundary = start + 1;

  for (let i = boundary + 1; i < end - 1; i++) {
    if (arr[i] < pivot) {
      swap(arr, i, boundary + 1);
      boundary++;
    }
  }

  // last swap, putting pivot in its rightful place
  swap(arr, boundary, start + 1);

  // recursion! I made this sort in-place, so no need to capture the return values of these
  quicksort(arr, start, boundary);
  quicksort(arr, boundary + 1, end);

  return arr;
}

let arr = [1, 4, 2, 8, 345, 123, 43, 5364, 8, 54, 0, 783, 23, 35];
let descendStart = 32;
const descendLength = descendStart;
for (let i = 0; i <= descendLength; i++) {
  arr[i] = descendStart;
  descendStart--;
}
console.log(`quicksort on [${arr.join(", ")}]:`);
console.log(quicksort(arr));

// what's next: the "hole" trick to replace swap -> one write per iteration
