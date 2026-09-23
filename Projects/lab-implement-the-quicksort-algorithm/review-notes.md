# Review notes — Quicksort

Claude's notes from the review sessions (2026-09-17 → 18). Timeline of the files is in [README.md](./README.md).

Only the things that were *new* during this project are here. The basics — recursion, base case, the divide-and-conquer idea — were right in attempt 1 and aren't repeated.

## Verdict per version

| | approach | verdict |
|---|---|---|
| **v1 (submitted)** | `less` / `greater` throwaway arrays, first element as pivot | Correct, passes fCC. O(n) extra memory, which gives away quicksort's one advantage over merge sort. |
| **in-place retry** | abandoned; Opus 5's version saved for reference | — |
| **"ultimate"** | median-of-three by index, scan right-to-left | Correct. 4 input shapes go quadratic. |
| **v2** | median-of-three **sorted in place**, scan left-to-right, sentinels | Correct. Best version. Still 4 shapes quadratic, but faster than the tutorial on every single one. |
| **v3** | planned three-way partitioning | Abandoned. The file is the plan comment and `// nah I give up` — nothing was written. |

## Findings

- **v1** — `less`/`greater` arrays make it a working sort but not really quicksort. The whole point of quicksort over merge sort is O(log n) stack vs O(n) buffer.
- **"ultimate":13** — `console.log` left inside `getMedianIdx`, firing on every recursive call. Same debug-leftover habit flagged in the insertion sort review.
- **"ultimate":53** — `quicksort(arr, boundary, end)` re-sorts the pivot, which is already in its final position. Should be `boundary + 1`. See the trap below — this "obviously correct" fix made things worse.
- **"ultimate":26–31** — the `end - start === 2` special case only existed to paper over the line above. Fix the cause, the special case disappears. **A special case that guards against your own bug is a smell.**
- **v2:34** — `arr[i] < pivot`, strictly less. Every element equal to the pivot piles into one side, so all-identical input peels 2 elements per level → O(n²) *and* a blown call stack at n=10000. Duplicates are the most common real-world input this breaks on.
- **v2:51–57** — the demo code overwrites the 14-element array with 33 descending values, so the original numbers are never sorted. Harmless, but it isn't testing what it looks like it's testing.

## The five things actually worth remembering

**1. Sorting the three sample elements in place is not cosmetic.** It gives the median's index for free (it's `middle`, by construction — no return value to package up), and it leaves the smallest at `start` and largest at `end - 1` as **sentinels**: elements guaranteed to stop the scan, so the loop can skip its bounds checks. libstdc++ calls that an **unguarded** loop. Isolated measurement, same partition otherwise, n=100,000:

| shape | median by index only | three sorted in place |
|---|---|---|
| random | 1,862,752 cmp | 1,880,922 cmp |
| reverse | **stack overflow** | 2,294,841 cmp |
| sawtooth | 101,067,793 cmp | **50,842,885 cmp** |

Free on ordinary data, turns crashes into completions.

**2. Three fixed `if`s, no loop — that's a sorting network.** A sort made of a fixed sequence of compare-and-swap steps decided in advance, independent of the data. Each `if (a > b) swap` is a **comparator**; three is the proven minimum for three elements. Useful whenever the count is fixed and known.

**3. The pivot rule and the partition direction are not independent.** Flipping the scan from right-to-left to left-to-right flipped which input killed it — organ pipe got 25× faster, inverted pipe got 2× slower. The killer input moves; it doesn't disappear. Any pivot rule that samples *fixed positions* can be beaten by a partition that keeps recreating the same pattern.

**4. Duplicates and adversarial shapes are two separate problems needing two separate fixes.** Measured at n=200,000:

| | two-way + med3 (v2) | three-way + med3 | three-way + random pivot |
|---|---|---|---|
| random | 12.9ms | 13.8ms | 14.0ms |
| sorted | 4.2ms | **83.3ms** | 9.0ms |
| all identical | **stack overflow** | 0.2ms | 0.2ms |

Three-way partitioning costs ~7% on ordinary data and fixes duplicates completely — but does nothing for bad shapes. A random pivot fixes shapes but nothing for duplicates. Both, or neither works.

**5. You can detect O(n²) without instrumenting anything: double n.** O(n log n) takes ~2× as long. O(n²) takes ~4×. That's the whole trick behind [benchmark.js](benchmark.js), and it works on *anyone's* code without editing it.

## The trap that cost the most time

Claude's first review claimed the "ultimate" version went quadratic on reverse-sorted input. It didn't. That number was measured on a version Claude had already modified — by applying its own `boundary + 1` suggestion — and *that change* is what caused the blowup:

| length-2 special case | pivot excluded (`boundary + 1`) | reverse-sorted, n=4000 |
|---|---|---|
| yes (as written) | no (as written) | 66,132 cmp, depth 21 |
| yes | **yes** | 2,007,996 cmp, depth 1001 |

Re-including the pivot looked like wasted work. It was accidentally breaking up the repeating pattern that median-of-three kept falling into.

Two lessons: **quicksort's speed is emergent — reason about it, then measure it, because small "obviously correct" changes move it a lot.** And: verify review claims, including Claude's. Asking *"how was that measured?"* would have caught it immediately.

## Habits to keep

- Rebuilding from a tutorial from memory instead of pasting. The result beat the tutorial on every input shape — because two ideas got added (sorting the three, skipping the sentinels) that the tutorial doesn't have.
- Writing the reasoning into the file as it happened, including the dead ends and the `// I give up`. The trail is why these notes could be written at all.
- Noticing that swapping `middle` → `end - 1` "doesn't make sense" — that instinct was right: it destroys the sentinel that was just created.

---

# How production code actually does this

Notes on the parts that were unclear — the insertion-sort cutoff, the heapsort bail-out, and what real libraries use for pivots.

## 1. The insertion-sort cutoff — and the trick that makes it better

Below ~16–45 elements, insertion sort beats quicksort. Not because of Big-O (it's still O(n²)) but because at that size quicksort's per-call overhead — pivot selection, function call, recursion bookkeeping — costs more than insertion sort's whole job. Big-O narrows the field; constant factors pick the winner.

The obvious way: `if (end - start < 16) return insertionSort(arr, start, end);`

**What libstdc++ actually does is better.** It stops recursing at 16 and just *leaves those chunks unsorted*. Then, once all the quicksort recursion has finished, it runs **one** insertion sort pass over the entire array.

That works because after quicksort stops, every element is already within ~16 positions of its final home. Insertion sort is O(n + number of inversions), so one full pass over a nearly-sorted array is O(n) — and a single pass has far less overhead than n/16 separate function calls.

That's the same property already noted in [sorting-algorithms-complexity.md](../../artifacts/sorting-algorithms-complexity.md): insertion sort is genuinely fast on nearly-sorted data. This is that fact being cashed in.

## 2. The heapsort bail-out (introsort), explained

The idea in one line: **watch how deep the recursion is getting, and if it's clearly going wrong, switch to an algorithm that can't go wrong.**

- Good quicksort splits roughly halve the range, so depth ≈ log₂(n). For a million elements that's 20.
- If the recursion is 40 levels deep and still going, the splits have been *terrible* — quicksort is heading for O(n²).
- So: pass a depth counter down. When it hits a limit (libstdc++ uses **2 × log₂(n)**), stop trusting quicksort *for that sub-range* and run **heapsort** on it instead.

Why heapsort specifically: it's O(n log n) in the **worst** case, not just on average, and it sorts in place with no extra memory. Its downside is that it jumps around the array unpredictably, which is bad for the CPU cache, so it's noticeably slower in practice. That's exactly the right shape for a parachute — you don't want it open normally, you want it to work every time you need it.

Result: quicksort's average speed with heapsort's worst-case guarantee. The name is **introsort**, short for *introspective sort* — it watches its own behaviour and reacts. In practice the bail-out almost never fires; it exists so no input can ever kill you.

So `std::sort` is all three at once: **quicksort does the work, heapsort is the safety net, insertion sort finishes the small stuff.**

## 3. What libraries use for pivots

| library | pivot strategy |
|---|---|
| C++ `std::sort` (libstdc++) | median of three (first, middle, last), moved to the front as a sentinel |
| Rust `sort_unstable`, Go `sort` | **pdqsort** — median of three for small ranges, **ninther** (median of three medians of three, 9 samples) above ~50 elements |
| Java `Arrays.sort` on primitives | **dual-pivot quicksort** — samples 5 evenly spaced elements, uses the 2nd and 4th as *two* pivots, giving three regions in one pass |
| JS `Array.prototype.sort` (V8) | **not quicksort at all** — a run-detecting merge sort (TimSort machinery, Powersort merge policy since Chromium 149, April 2026) |

**The thing worth noticing: none of them use a random pivot.** Random is the simplest way to get a worst-case guarantee, but the libraries avoid it — a random number per partition costs real time, and non-deterministic performance makes bugs hard to reproduce. They chose deterministic sampling *plus a guaranteed escape hatch* (introsort's depth limit, or pdqsort's bad-split detection) instead. Same safety, no dice-rolling.

pdqsort goes one step further: when it detects a partition that split badly, it deliberately shuffles a few elements to **break the pattern** before trying again — hence "pattern-defeating quicksort."

## 4. What JS itself actually uses — and why it changed in 2026

`Array.prototype.sort` in V8 is a run-detecting merge sort, and in April 2026 (Chromium 149, so current Chrome and Node) part of it was replaced. The interesting bit is how *small* the replaced part was.

TimSort is really two things bolted together:

1. **Run detection and merging** — scan the array, find stretches already in order ("runs"), pad short ones out to ~32–64 elements with a binary insertion sort, then merge runs with a pile of low-level tricks (galloping search, temp buffer).
2. **A merge policy** — the rule deciding *which* runs to merge and *when*. TimSort's version is a set of hand-tuned inequalities comparing the lengths of the top few runs on a stack.

Part 1 is excellent and nobody wanted to touch it. Part 2 was Tim Peters' educated guess from 2002 — it works, but it was never derived from anything, it can do up to ~50% more merging than optimal on certain run patterns, and it had a real bug where the run stack could overflow its assumed bound.

**Powersort replaces only part 2.** It gives each boundary between two runs a "power" — roughly, how deep that boundary sits in an idealised perfectly-balanced merge tree — and merges in power order. Same run detection, same merging code, about 20 lines of policy changed. That's why it could drop into CPython 3.11, and later V8 and WebKit.

**Why did V8 wait ~4 years after Python?** This is the part worth carrying into your own work:

- **The win lands somewhere narrow.** Powersort only pulls ahead on inputs with many runs of awkwardly varying lengths. On random data, or data with a few long runs, both policies make nearly the same merges — and V8's benchmarks are full of those ordinary cases.
- **V8's sort isn't pure TimSort anyway.** Arrays of packed small integers and doubles take faster specialised paths; the TimSort path handles the general object case. So the change only touches a slice of real workloads.
- **Stability is a spec guarantee** (required since ES2019), and comparator functions are arbitrary user code that can mutate the array mid-sort. Any change needs heavy fuzzing against a mountain of web-compatibility tests. In a browser engine, "correct and boring" beats "slightly faster".
- **Someone has to actually do it.** These land when a contributor writes the patch and shepherds it through review. That's what happened in 2026.

> **A paper proving an algorithm is optimal doesn't make it a priority to ship.** Shipping depends on where the win lands relative to real workloads, how much risk the change carries, and whether anyone is paid to care.

Sources: [powersort.github.io](https://powersort.github.io/) · [Powersort (Wikipedia)](https://en.wikipedia.org/wiki/Powersort) · [Munro & Wild, 2018](https://www.wild-inter.net/publications/munro-wild-2018) · [Timsort (Wikipedia)](https://en.wikipedia.org/wiki/Timsort)

## Where to pick this up again

The natural next steps, in order of value:

1. **Three-way partitioning** (Dutch national flag) — fixes the duplicates crash. This is what v3 was meant to be — the plan in that file (two boundary trackers, `boundaryLo` and `boundaryHi`) is the right shape.
2. **The hole trick** applied to partitioning — roughly halves the array writes, same invariant as insertion sort v3 ("where is the hole?").
3. **A depth limit**, just to feel how introsort's parachute is wired — it does not need a real heapsort to understand; counting the depth and printing when the limit trips is enough.
