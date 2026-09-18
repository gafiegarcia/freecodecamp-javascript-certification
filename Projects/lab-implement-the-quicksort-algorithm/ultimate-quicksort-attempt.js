// Okay I'll try implementing median of three based on this: https://dev.to/pineapples/writing-a-median-of-three-pivot-helper-for-quicksort-289m
// I'll try rebuilding from memory as much as I can...

// gonna need some helpers since `.sort()` is banned
function smallerIdx(arr, a, b) {
  if (arr[a] < arr[b]) return a;
  return b;
}

function getMedianIdx(arr, start, end) {
  const middle = Math.floor((start + end) / 2);
  const smallest = smallerIdx(arr, start, smallerIdx(arr, middle, end - 1));
  console.log(start, middle, end);

  if (smallest === start) return smallerIdx(arr, middle, end - 1);
  if (smallest === end - 1) return smallerIdx(arr, start, middle);
  return smallerIdx(arr, start, end - 1);
}

function swap(arr, a, b) {
  [arr[a], arr[b]] = [arr[b], arr[a]];
}

function quicksort(arr, start = 0, end = arr.length) {
  if (end - start < 2) return arr;
  if (end - start === 2) {
    if (arr[start] > arr[end - 1]) {
      swap(arr, start, end - 1);
    }
    return arr;
  }

  const pivotIdx = getMedianIdx(arr, start, end);
  const pivot = arr[pivotIdx];

  // initial swap. pivot lives at the last index during the loop
  swap(arr, end - 1, pivotIdx);

  let boundary = end - 1;

  for (let i = boundary - 1; i >= start; i--) {
    if (arr[i] > pivot) {
      swap(arr, i, boundary - 1);
      boundary--;
    }
  }

  // last swap, putting pivot in its rightful place
  swap(arr, boundary, end - 1);

  // recursion! I made this sort in-place, so no need to capture the return values of these
  quicksort(arr, start, boundary);
  quicksort(arr, boundary, end);

  return arr;
}

const arr = [1, 4, 2, 8, 345, 123, 43, 5364, 8, 54, 0, 783, 23, 35];
console.log(`quicksort on [${arr.join(", ")}]:`);
console.log(quicksort(arr));

// current conclusion: I cannot copy Opus 5's logic (in the in-place partitioning version) for the sort (the swap loop) because the the the pivot and the boundary is not always on the left. I currently cannot find a way to make this median of three work in js without... using `.sort()` itself (which is kinda cheating, since the fcc project explicitly said to not use the built-in `.sort()`)
// nvm: I'll read some tutorials and try to rebuild it from scratch
// Noting it at the top...

// okay now I decided to use the end of array as the pivot temp position just like the tutorial (unlike Opus 5 in-place partitioning example) based on the assumption that real world use may have semi-sorted data so; nvm that doesn't matter actually, since I still need to loop over everything and do the swap

// what I don't like:

// two writes instead of one write per swap (I like how insertion has a "hole" that for each "swap" it only needs one write... I guess not possible?)

// I'm not sure if this is actually faster and better on average compared to a simpler solutions like:
// - picking the start/end element
// - picking the middle element
// - using Math.random (especially this)
