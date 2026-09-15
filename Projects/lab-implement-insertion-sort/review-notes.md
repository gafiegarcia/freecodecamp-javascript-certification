# Review notes — Insertion Sort

Claude's notes from the review session (2026-09-12 → 15). Three versions, all correct.

## Verdict per version

| | approach | verdict |
|---|---|---|
| **v1** | search backwards, then `splice` into place | Correct, but 3 `break`s and 2 special cases. Not the algorithm the lesson describes. |
| **v2** | swap backwards (textbook) | Correct and much clearer. Zero special cases — that's the real win, not the line count. |
| **v3** | hold `current`, slide the hole left | Best. Half the array writes of v2. Also sorts slices. |

## Findings

- **v1:16** — compared `arr[i]` while `current` was already captured. Use the snapshot everywhere; mixing the two is how off-by-one bugs start.
- **v2:10,13,14** — `console.log` left inside the hot loop of a submitted solution. Strip debug output, or use `debugger;` instead.
- **v1 `splice`/`unshift`** — look like one operation, actually shift the whole tail. Inserting anywhere but the end of an array is O(n).
- **v3 (first draft)** — relied on `arr[-1] === undefined` to stop the loop. Worked, but ~8× slower. See below.
- **v3 (second draft)** — `end = arr.length` in the default parameter ran *before* the `Array.isArray` guard, so `null`/`undefined` bypassed the error message. Fixed with `arr?.length`.

## The 8× thing (worth remembering)

`while (arr[j - 1] > current)` stops at index 0 because `arr[-1]` is `undefined`. Correct, but slow:

```
implicit (arr[-1])  : 21.0 ms
explicit (j > start):  2.6 ms     ← 60 arrays × 600 ints, Node 24
```

Only **6 of 185,774** reads actually went out of bounds. The cost isn't those 6 — it's that one out-of-bounds read at a line permanently kicks *that line* off the engine's fast path, so the other 185,768 reads get slow too.

`j > start &&` short-circuits, so the bad read never happens. It's not an extra check; it's a cheap check replacing an expensive one.

## Habits to keep

- **Finish it, then improve it.** Gaf wrote v1 without agonizing over the final shape, then refined. Correct order — you can't refactor code that doesn't exist.
- **Testing assumptions instead of guessing** (`console.log([1][-1])` before relying on it).
- **Guard clauses with the right error type** (`TypeError`, not generic `Error`), failing fast at the top.
- **Naming the variable after what it means.** v3's `j` tracks the *hole*, not the comparison position — which is why there's no `+ 1` anywhere. Better than the version I suggested.
- **Pushing back with a cost model.** The "a check per iteration isn't free" argument was right and measurable; it just priced the check added without pricing the one removed.

## Two rules that generalize

- A guard clause can only guard what runs *after* it. Default parameters and parameter destructuring run first.
- `?.` is not validation. It means "don't crash if this is missing" — it keeps the function alive for one more line so the real check can fire.

## Look ahead

- v3 takes `(arr, start, end)`, which is the shape real libraries use — quicksort recurses down to ~10–16 elements, then finishes each small stretch with insertion sort. Relevant to the Quicksort lab.
- v2 and v3 are **stable** (`>` stops on equal values, so ties keep their original order); v1 is not. Invisible for plain numbers, matters when sorting objects by a key.
