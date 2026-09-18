// after some conversation about the advantages of quicksort, this is me retrying this algorithm after submission but with in-place operations instead of using throwaways `less` and `greater` arrays, which kills the advantage of quicksort (however many examples in online articles use the same pattern I did in the submitted version...)

function quicksort(arr, start = 0, end = arr.length) {
  if (arr.length < 2) return;

  for (let i = start + 1; i < end; i++) {
    // I give up
  }
}

const arr = [8, 1, 4, 2, 10, 345, 123, 43];

// epic fail
// so here's Opus 5's implementation of in-place quicksort in js

/*

function quicksort(arr, start = 0, end = arr.length) {
  if (end - start < 2) return arr;

  const pivot = arr[start];
  let boundary = start + 1;

  for (let i = start + 1; i < end; i++) {
    if (arr[i] < pivot) {
      [arr[i], arr[boundary]] = [arr[boundary], arr[i]];
      boundary++;
    }
  }

  // pivot's final home is just before the small pile
  [arr[start], arr[boundary - 1]] = [arr[boundary - 1], arr[start]];

  quicksort(arr, start, boundary - 1);
  quicksort(arr, boundary, end);

  return arr;
}

*/

// beautiful...
