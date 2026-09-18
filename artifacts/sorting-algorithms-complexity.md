# Sorting Algorithm Complexity (+ Binary Search)

`n` = number of items. "Space" = extra memory beyond the input array.

| Algorithm | Best | Average | Worst | Space | Stable |
| --- | --- | --- | --- | --- | --- |
| Bubble sort | O(n) | O(n²) | O(n²) | O(1) | yes |
| Selection sort | O(n²) | O(n²) | O(n²) | O(1) | no |
| Insertion sort | O(n) | O(n²) | O(n²) | O(1) | yes |
| Merge sort | O(n log n) | O(n log n) | O(n log n) | O(n) | yes |
| Quicksort | O(n log n) | O(n log n) | O(n²) | O(log n) avg, O(n) worst | no |
| Binary search | O(1) | O(log n) | O(log n) | O(1) iterative, O(log n) recursive | — |

## When each case happens

- **Bubble** — best O(n) only if you have the early-exit `swapped` flag and the array is already sorted; without the flag it's O(n²) always. Worst: reverse sorted.
- **Selection** — no best case. It scans the whole remaining array every pass no matter what the data looks like. Always n(n-1)/2 comparisons. Does the fewest swaps though: at most n-1.
- **Insertion** — best O(n) when already sorted (each item stops immediately). Worst: reverse sorted. More precisely O(n + inversions), so genuinely fast on nearly-sorted data.
- **Merge** — same in all cases; the splitting ignores the data. log n levels × O(n) work per level. Costs O(n) extra memory for the merge buffer.
- **Quicksort** — O(n log n) when pivots split roughly in half. Worst O(n²) when the pivot is the min or max every time; with a first-element pivot that means an **already-sorted array**. Fixed by picking a random or median-of-three pivot. Space is just the recursion stack.
- **Binary search** — needs a **sorted** array. Halves the range each step, so at most log₂ n comparisons: 20 for a million items, 30 for a billion.

## Notes

- Constants and lower terms drop: `3n² + 5n` is O(n²). Log base doesn't matter either.
- **Stable** = equal items keep their original relative order. Lets you sort by one field then another.
- O(n log n) is the floor for any comparison-based sort. Counting/radix/bucket sort beat it only by not comparing — they exploit the structure of the keys.
- JS's `Array.prototype.sort()` is TimSort in V8 (Powersort since Chromium 149): O(n log n) worst, O(n) on sorted input, stable since ES2019. With no comparator it sorts as **strings** — `[10, 9, 1].sort()` gives `[1, 10, 9]`. Pass `(a, b) => a - b` for numbers.

## Worth remembering

- **Big-O narrows the field; constant factors pick the winner.** Bubble and insertion sort are both O(n²), but insertion sort ships in production and bubble sort doesn't. No table has a column for the thing that decides it.
- **Insertion sort isn't obsolete — it's specialized.** It runs inside TimSort and C++'s `std::sort` (which is really *introsort* — quicksort does the work, heapsort is the safety net when recursion goes too deep, insertion sort finishes the small stuff): every serious sort switches to it once a chunk drops under ~16–48 items, because at small n its setup cost (no recursion, no buffer, no pivot) beats the smarter algorithms' bookkeeping. Bubble sort is the obsolete one — insertion sort does the same job with half the comparisons and a best case it can actually reach.
- **The gap trick in insertion sort.** Saving the current value out of the array leaves a hole, so you *slide* neighbours into it (1 write each) instead of *swapping* them (3 writes each). Swap-based insertion sort is correct but costs 3× the writes. The invariant worth holding in your head is **"where is the hole?"** — and the clearest code names a variable after it directly, so `j` *is* the hole and `j - 1` is the element being examined:

  ```js
  for (let i = start + 1; i < end; i++) {
    let j = i;
    const current = arr[j];

    while (j > start && arr[j - 1] > current) {
      arr[j] = arr[j - 1];  // fill the hole
      j--;                  // hole moves left
    }

    arr[j] = current;       // drop it in
  }
  ```

  — from [`Projects/lab-implement-insertion-sort/lab-implement-insertion-sort-3.js`](../Projects/lab-implement-insertion-sort/lab-implement-insertion-sort-3.js). Finding an invariant beats simulating a loop in your head.

- **Fun fact — the textbook and the standard library disagree here.** CLRS pseudocode makes the loop variable the element being *examined*, so the hole becomes a derived `i + 1` — which is why nearly every tutorial, and every AI, writes `arr[j + 1] = current`. But libstdc++'s `__unguarded_linear_insert`, the insertion sort inside C++'s `std::sort`, makes its cursor *be* the hole — the same shape as the code above. The `j + 1` form is a textbook convention, not a production one.
- **Quicksort's worst case is an already-sorted array** when the pivot is the first or last element — the one input that looks easiest. Switching to the **middle index** (`arr[Math.floor((lo + hi) / 2)]`) fixes *that* case dramatically (measured on n=2000: 2,002,998 comparisons → 20,010), but it is **not a guarantee** — it only swaps which input kills you. Middle-index dies on an "organ pipe" array (values rise to the middle, then fall), because there the middle slot always holds the maximum: 1,003,887 comparisons, depth 1000. **Any fixed pivot rule has an input that defeats it.** Real safety comes from a **random pivot** (nobody can craft against choices you haven't made yet) or a **depth limit** that bails out to heapsort — the first makes disaster unlikely, the second makes it impossible. And note one bad pivot is harmless: O(n²) needs extreme pivots *repeatedly*, so even a consistent 90/10 split is still O(n log n).
- **Stability only matters when items carry identity.** Two equal numbers are indistinguishable, so there's nothing to preserve — that's why C++ and Java offer both a fast unstable sort for primitives and a stable one for objects. JS has one `.sort()` for everything, so the spec chose stable (ES2019) and there's no opting out.
- **In `.sort()`, the expensive part is calling your comparator, not the sorting** — roughly 4× the rest of the work, because the engine has to step out of its own built-in code to run your function. That's why V8 picked this family of sort: it detects stretches that are already in order and skips asking about them (15× fewer comparator calls on realistic data). Also why sorting is essentially never a web app's bottleneck — that's network, images, and re-renders.
