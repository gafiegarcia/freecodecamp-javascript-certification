// The dev.to tutorial's code, copied verbatim for comparison. Not mine, not to be edited.
// Source: https://dev.to/pineapples/writing-a-median-of-three-pivot-helper-for-quicksort-289m
// (by "pineapples", posted 2022-12-10, edited 2025-04-17)
//
// Note: this tutorial treats `end` as INCLUSIVE (end = arr.length - 1),
// while my attempts treat it as EXCLUSIVE (end = arr.length).

function numberCompare(a, b) {
  return a - b;
}

function quickSort(arr, comparator = numberCompare, start = 0, end = arr.length - 1) {
  if (start < end) {
    const iPivot = pivot(arr, comparator, start, end);

    quickSort(arr, comparator, start, iPivot - 1);
    quickSort(arr, comparator, iPivot + 1, end);
  }

  return arr;
}

function bigger(arr, a, b) {
  if (arr[a] > arr[b]) return a;
  return b;
}

function getMedianPivotIdx(arr, start = 0, end = arr.length - 1) {
  const mid = Math.floor((start + end) / 2);

  const iBiggest = bigger(arr, start, bigger(arr, mid, end));

  if (iBiggest === start) return bigger(arr, mid, end);

  if (iBiggest === end) return bigger(arr, start, mid);

  return bigger(arr, start, end);
}

function swap(arr, idxA, idxB) {
  [arr[idxA], arr[idxB]] = [arr[idxB], arr[idxA]];
}

function pivot(arr, comparator = numberCompare, start = 0, end = arr.length - 1) {
  const iPivotStart = getMedianPivotIdx(arr, start, end);
  const pivotVal = arr[iPivotStart];
  let iPivotTarget = start;

  swap(arr, iPivotStart, end);
  const iPivotTemp = end;

  for (let i = start; i < iPivotTemp; i++) {
    const curr = arr[i];

    if (comparator(curr, pivotVal) < 0) {
      swap(arr, i, iPivotTarget);
      iPivotTarget++;
    }
  }

  swap(arr, iPivotTemp, iPivotTarget);
  return iPivotTarget;
}

// benchmark.js looks for a function named `quicksort` taking just the array
function quicksort(arr) {
  return quickSort(arr);
}
