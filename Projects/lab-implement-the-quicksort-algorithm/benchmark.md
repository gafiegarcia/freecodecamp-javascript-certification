## Checking your own work: `benchmark.js`

Run it on any file in this folder that defines a `quicksort` function:

```
node benchmark.js ultimate-quicksort-attempt-v2.js
```

Optional extra arguments: array size (default 10000) and how many times to
repeat each timing (default 3).

```
node benchmark.js ultimate-quicksort-attempt-v2.js 20000 5
```

You don't have to change your file to use it. The script reads it, grabs
whatever `quicksort` is defined there, and mutes any `console.log` the file
does on its own, so the demo code at the bottom won't get in the way.

### What it reports

**Correctness** — a handful of hand-picked awkward inputs (empty array, one
item, two items in both orders, all-duplicates, negative numbers) plus 20,000
random arrays deliberately packed with duplicates. It checks two things: the
result is in order, *and* the result holds the same values as the input. That
second check matters — a sort that loses or duplicates an element can still
look "sorted".

**Scaling** — the interesting part. It doesn't count comparisons or recursion
depth, because that would mean editing your code. Instead it uses a trick:

> Sort a shape at size `n`, then at size `2n`. Compare the two times.
>
> - O(n log n) → about **2x** slower
> - O(n²) → about **4x** slower

So a `4.0x` in the growth column means that shape is quadratic, no matter what
the pivot rule is supposed to guarantee. Anything at or above `3.2x` is flagged
FAIL, `2.6x`–`3.2x` is flagged suspicious (worth a second look at a bigger `n`),
below that is fine.

`STACK` means the call stack blew up. That's an automatic fail and it's the
worst outcome — quadratic *depth* means the recursion goes ~n levels deep, and
JavaScript runs out of stack long before the sort would have finished. A sort
that's merely slow still returns an answer; this one crashes.

### The input shapes, and why each one is there

| shape | what it is | what it catches |
| --- | --- | --- |
| random | all distinct, shuffled | the everyday case — this is your baseline speed |
| sorted | already in order | kills a first-element or last-element pivot |
| reverse sorted | exactly backwards | same, and very common in real data |
| organ pipe | rises to the middle, then falls | kills a middle-index pivot |
| inverted pipe | falls to the middle, then rises | the mirror image — catches you if you flipped your partition direction |
| sawtooth | repeating `0..49` ramp | a mix of pattern and duplicates |
| few unique values | only 5 distinct values | duplicates in bulk |
| all identical | every element the same | the extreme duplicates case |

The last two are the ones most worth caring about. Sorted and reverse-sorted
data shows up all the time, but so do columns with only a handful of distinct
values — a status field, a category, a rating out of 5. Organ pipe and inverted
pipe basically never occur naturally; they're there to prove the point that
**every fixed pivot rule has some input that defeats it.** Fix one, another
appears.

### One thing to watch out for

Timings jitter. If a number looks off, re-run it, or raise the repeat count.
Very small arrays are especially noisy — that's why the default `n` is 10000
rather than something tiny.
