## What I learned

- frame: one function call in progress, the "plate". NOT a recursion thing — every call to every function gets one. recursion just makes many frames of the same function
- call stack: the whole pile of live frames, the "stack" of plates. one per program, only grows and shrinks
    - each frame holds: that call's args + locals, and a bookmark for where to resume when its child returns
    - stack traces are literally this pile printed top-down: first line = where it broke, lines below = how it got there
    - depth ≠ total calls. "banana" made 1957 calls but the stack never got taller than ~7 frames. overflow depends on depth only
- `prefix` is private: **each frame gets its own set of variables** (not "scope" — scope is about where code is *written*, frames are made by *running*)
- `result` is shared
    - when I pass it as the third argument, it actually passes the reference as the arg value, which is just the address of the default empty array initialized in the beginning -> all frames share the same array because of that.
    - `.push()` in base cases pushes directly the `result` array, the same `result` array that's passed around in all recursive calls originating from the first frame.
    - `result = []` is a *default parameter*, evaluated fresh on every call where the arg is undefined -> NOT global. calling `permuteString("ab")` twice gives clean results both times
    - `return result` in the base case is REQUIRED, not decorative. when input is `""` the base case IS the outermost call, so it's the only `return` that runs — the bottom one is unreachable. bare `return` -> `permuteString("")` gives `undefined`, fails test 6. (in child frames the value really is ignored)
- ⚠️ `result.concat(...)` in my for loop was DEAD CODE
    - `.concat()` never mutates: it builds a new array and hands it back, which in my case, is not assigned to anything, never caught.
    - what actually made my solution work was `.push()` writing into the shared array.
    - **call by sharing**: mutating through a param (`result.push(x)`) IS visible to the caller. reassigning the param (`result = [...]`, `result = result.concat(x)`) is NOT — I'd just be repointing my own copy of the address
    - habit: for any method, ask "does this change the thing, or hand me a new thing?" if it hands me a new thing and I didn't catch it in a variable or a `return`, the line does nothing
    - mutates: `push` `pop` `splice` `sort` `reverse` `shift` `unshift` | returns new: `concat` `slice` `map` `filter` `toSpliced` `toSorted` `trim`
- At first, it was impossible for me to even imagine how the stack visually looks like. It's a bit easier now with this distinction:
    - The `for` loop is the **branching**;
    - the recursive call is the **descending**;
    - the recursion I wrote is basically the Depth First Search pattern, where each branch tries to descend as deep as possible first—this "two-dimensional" operations helped me understand what's going on in each step
    - specifically *pre-order* DFS: I do the work on the way DOWN (extending prefix) and ignore what comes back up. compare countdown's `return [n, ...countdown(n-1)]` — same recursion, work happens on the way UP, and the child's return value is essential there
    - the invariant that keeps me sane: `prefix.length + string.length` === original length, at every single node
    - `prefix` = where I AM (must be per-frame). `result` = what I've FOUND (must be shared). getting that split right is the whole puzzle in every backtracking problem

## Ultimate solution from Claude

my solution traverses all possible prefixes even when some characters are duplicates; it does the same work for all strings with the same length -> wasteful when some characters are not unique

it only checked for uniqueness *after* the recursion has done the work of checking the permutation possibility, right before it tries to push the value to the result array.

this solution from claude *prevents* unnecessary work of checking permutation when a previous iteration in the for loop already used a prefix with the same exact strings

```js 
function permuteString(string, prefix = "", result = []) {
  if (string.length === 0) {
    result.push(prefix);      // no dedupe check needed anymore
    return result;
  }

  const strArray = Array.from(string);
  const seen = new Set();     // characters already used at THIS position

  for (const [i, ch] of strArray.entries()) {
    if (seen.has(ch)) continue;
    seen.add(ch);
    permuteString(strArray.toSpliced(i, 1).join(""), prefix + ch, result);
  }

  return result;
}
```

`seen` is created fresh in each frame, so it only stops repeats at THAT one position — a char used at position 0 must still be usable at position 1. verified: identical output, identical order, on all 8 test strings.

recursive calls for "banana":
- mine   : 1957
- pruned :  189      ← 10.4× less work, same answer

why the gap is so big: a duplicate rejected at the base case isn't one wasted call — it dragged a whole subtree of calls behind it. pruning kills the subtree before it's born. (same lesson as v3 > v2 in range-of-numbers, one level up)

also: dropping `!result.includes(prefix)` removes a linear scan that ran on every finished permutation. O(n) lookup inside a factorial-sized loop
