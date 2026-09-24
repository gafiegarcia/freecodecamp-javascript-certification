# Review: Implement the N-Queens Algorithm 👑

## First, about feeling like you cheated

You didn't. Here's what you worked out on your own, from your own list:

- The stack + `while (stack.length > 0)` pattern for DFS
- A starting point on the stack (your "anchor")
- Reversing the column loop to get the order the tests expect (you figured this out from the test output!)
- Saving a board as a solution when its length reaches `n`
- Printing boards with `displayBoard` to find the diagonal bug yourself

The piece you needed help with, "the stack holds *partial boards*, not single nodes," is **the** key idea of this whole problem. It's the jump from "DFS over a graph someone gave you" to "DFS over choices you build as you go." That jump is hard for everyone the first time. Getting a hint on the hardest idea and then building everything else yourself is exactly how people learn this.

The honest test of whether it stuck isn't whether you had help. It's whether you can rebuild it later without help. You already do reattempts, so here's a good one: **in a few days, open an empty file and write `dfsNQueens` from scratch.** If you can explain *why popping `[0]` doesn't lose anything*, you own it.

## Overall

**Correct, clean, and already pretty idiomatic.** I ran your function for n = 1 to 6 and n = 8. It matches every expected result, including the order. The code is short, each variable has one clear job, and none of your leftover debug logs are inside the function. Most of what's below is polish, not bugs.

## 1. A more idiomatic version using what you've learned

### a) Start from an empty board and drop the outer loop

Your outer `for (let i ...)` loop on [line 14](Projects/lab-implement-the-n-queens-algorithm/lab-implement-the-n-queens-algorithm.js:14) creates **a new stack for each first-row column**. That works, but it handles row 0 differently from every other row. What if row 0 were just like the others?

Start the stack with **zero queens placed**: `[[]]`. When you pop the empty board, the next row is `0`, and the column loop pushes `[3]`, `[2]`, `[1]`, `[0]`, the same way it handles every other row. Your "anchor" turns into a normal step of the algorithm.

I tested this against your version for n = 1 to 8, and the output is identical, order included.

```js
function dfsNQueens(n) {
  if (n < 1) return [];

  const isQueenSafe = (board, row, col) =>
    board.every((c, r) => c !== col && Math.abs(row - r) !== Math.abs(col - c));

  const solutions = [];
  const stack = [[]]; // one empty board: no queens placed yet

  while (stack.length > 0) {
    const board = stack.pop();
    const row = board.length;

    if (row === n) {
      solutions.push(board);
      continue;
    }

    for (let col = n - 1; col >= 0; col--) {
      if (isQueenSafe(board, row, col)) stack.push([...board, col]);
    }
  }

  return solutions;
}
```

Compared with your version:

| Change | Why |
|---|---|
| `[[]]` instead of the outer `for` loop | One loop instead of two. Row 0 isn't a special case anymore. |
| Arrow function with no `{ return ... }` | An arrow body that's a single expression returns it automatically. You don't need the braces or the `return`. |
| `current` → `board`, `j` → `col` | Names that say *what* the value is. `col` next to `row` reads like chess coordinates. |
| `continue` instead of `if/else` | "Found a solution, skip to the next board." This removes one level of nesting. (Your version is fine too. This is a style choice.) |

### b) The same thing with recursion (you've covered this already!)

Recursion comes before this lab in the curriculum, and you have a [recursive-dfs.js](Projects/lab-implement-the-depth-first-search-algorithm/recursive-dfs.js) from last time. Here's the recursive shape:

```js
function dfsNQueens(n) {
  if (n < 1) return [];
  const solutions = [];

  const placeQueen = (board) => {
    const row = board.length;
    if (row === n) {
      solutions.push(board);
      return;
    }
    for (let col = 0; col < n; col++) {
      if (isQueenSafe(board, row, col)) placeQueen([...board, col]);
    }
  };

  placeQueen([]);
  return solutions;
}
```

Two things to notice:

- **There's no stack variable.** The **call stack** does that job. Each `placeQueen` call that's waiting to finish is like a board sitting on your stack.
- **The loop counts *up* here, not down.** A recursive call finishes that whole branch before the loop moves on, so column 0 is explored first on its own. The reverse-order trick is only needed when you push everything first and pop later.

This recursive version is the "textbook" form of N-Queens, usually called **backtracking**. Your stack version is the same algorithm written out by hand.

## 2. Beginner pitfalls or bad habits

**Nothing serious.** Two small notes:

- **The helper's first parameter is named `current`**, the same as the variable in the `while` loop. That works, since they're separate variables, but it can confuse a reader: "is this the *same* `current`?" A different name inside the helper, like `board`, avoids that.
- **`isQueenSafe` is re-created on every call to `dfsNQueens`.** It doesn't use `n` or anything else from inside `dfsNQueens`, so it could live outside as a regular top-level function. That's optional: keeping a helper next to the only place it's used is also a reasonable choice.

## 3. What you did well (keep doing these!)

- **`[...current, j]` on [line 26](Projects/lab-implement-the-n-queens-algorithm/lab-implement-the-n-queens-algorithm.js:26).** You make a **new** board for each child instead of `.push()`-ing onto the shared one. This is the part many people get wrong, and it's what makes "popping is harmless" true.
- **The backwards `for` loop for ordering.** It's simpler than your DFS lab's `.sort()`, and you figured out the need for it from the test output alone.
- **`displayBoard`.** Building your own tool to *see* the data is how you found the diagonal bug. Keep doing this, it's a real professional habit.
- **Picking the right array method.** You went from `forEach` (which ignores the return value) to `.some()`, then to `.every()`. When you flipped the question, you also had to flip `||` to `&&` (De Morgan's law). Now you understand both of those, not just the fix.
- **A helper function with a clear name.** Reading `if (isQueenSafe(current, row, j))` tells you what's happening without looking at the math.

Congrats on finishing another lab! 🎉 Next up is the Graphs and Trees review and quiz, and you now have two DFS styles (graph and search-tree) to bring into it.
