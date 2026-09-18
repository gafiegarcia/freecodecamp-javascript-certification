Timeline:
1. [lab-implement-the-quicksort-algorithm.js](./lab-implement-the-quicksort-algorithm.js): first submitted attempt on fcc, passed the tests.
2. [quicksort-with-in-place-partitioning.js](quicksort-with-in-place-partitioning.js): asked AI for a review, which pointed me at me "missing the point" of using quicksort: using (two extra) throwaway arrays for `less` and `greater` (which "use memory" themselves as far as I understand) -> sort it in-place. In the end I gave up and Opus 5 gave the answer which I just copy-pasted for reference
3. [ultimate-quicksort-attempt.js](ultimate-quicksort-attempt.js): After further conversations with AI where I [learned more about sorting algorithms](../../artifacts/sorting-algorithms-complexity.md), I learned that the worst case for quicksort can totally be mitigated by **choosing the pivot smartly**.

    The "easy" options that may still produce the `O(n²)` time (and `O(n)` space) complexity are using first, last, or middle index as pivot.

    The "smarter" options that mitigate the worst case (and also faster across the board — random avg, sorted, reverse sorted, etc. — since pivots are rarely ever at any extreme ends of the list) are: picking a **random** index or use **median-of-three**. Claude said that median-of-three is what's used in production, so I attempted at exactly that, referring to a [tutorial](https://dev.to/pineapples/writing-a-median-of-three-pivot-helper-for-quicksort-289m) (bcs turns out I'm not smart enough to spawn the idea from scratch after hours staring and thinking) and Claude's swap logic in its [in-place quicksort example](./quicksort-with-in-place-partitioning.js) then trying to rewrite it my way.

    Claude flagged that this is broken for **reverse sorted** and **organ pipe** input. Time for a reattempt

4. [ultimate-quicksort-attempt-v2.js](ultimate-quicksort-attempt-v2.js): Another attempt using **median-of-three, sorted in-place first**. The case I was focusing to fix was the reverse-sorted case, but turns out the first "ultimate" attempt didn't have that problem (Claude misreviewed it). But, this v2 still fixed the other case Claude flagged: **organ pipe**. In the end, this v2 is still broken on some input cases I hadn't even thought about: **inverted pipe**, **few unique** (Claude tried with 5 unique values), and **all identical**.
    - The fix: use **three-way partitioning**. I guess that means treating items with values === pivot differently than the "less" and "greater" ones. So mentally, three groups.
    - nvm I give up, this shit so far out of my league
    - anyway, nice to know that this already beats the dev.to "median-of-three tutorial code" in every way. So I'm happy for now

---

Claude created a benchmark script for the testings
- Script: [benchmark.js](benchmark.js)
- help info: [benchmark.md](benchmark.md)
