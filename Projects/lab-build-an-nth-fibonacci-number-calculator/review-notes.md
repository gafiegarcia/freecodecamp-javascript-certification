> not much of a review, but still good to review, even the easy ones (as Opus 5.5 said below...). I think this lab's only purpose is to really nail down the concept of dynamic programming, which took me an hour to really understand during the theory lesson (including back and forth questions with claude, since the difference between "optimal substructure" and "overlapping subproblems" and what each really is aren't obvious at first to me as a beginner)

## Overall assessment

This is clean, correct, and about as close to a textbook answer as this lab allows. It passes every stated test, uses no recursion, and handles the `n = 0` and `n = 1` cases without any special-case `if` statements. You're right that the lab is really checking one idea. You got that idea right, so most of this review is about naming what you did so it sticks.

**The DP concept you used, named:** your approach is called **bottom-up tabulation**. You start from the smallest answers you already know (`[0, 1]`) and fill a table (the `sequence` array) upward. Each new entry is built only from entries already in the table. Think of climbing stairs: you never jump to step 10, you stand on 8 and 9 to reach it. The alternative, "top-down memoization," starts at `n` and recurses downward while caching results. Test 11 bans recursion, so tabulation is exactly what fCC wanted.

## 1. Is there a more efficient or idiomatic solution with what's been taught?

**Efficiency:** Your loop runs `n - 1` times and does constant work each time. That's O(n) time, which is optimal for this approach, so there's nothing wasted.

**Idiom, one small nitpick:** at `lab-build-an-nth-fibonacci-number-calculator.js:5`, User Story 5 says each number should be **appended** to `sequence`:

```js
sequence[i] = sequence[i - 1] + sequence[i - 2];   // yours: "put this at slot i"
sequence.push(sequence[i - 1] + sequence[i - 2]);  // alternative: "add this to the end"
```

These do exactly the same thing here, because `i` always equals `sequence.length` when that line runs. The difference is what the code tells a reader. `push` says "append" directly. `sequence[i] = …` makes the reader check that `i` really is the next empty slot. This is a readability preference, not a bug. Your version is perfectly valid, and it mirrors the math formula F(i) = F(i−1) + F(i−2) nicely.

## 2. Beginner pitfalls or bad habits?

None worth fixing. A few edge cases that fall outside the lab's contract are still worth knowing:

- **Negative `n`:** `fibonacci(-3)` returns `undefined`, because the loop never runs and `sequence[-3]` doesn't exist. The lab promises a non-negative integer, so that's fine. In real code, you'd usually validate input like this or document the assumption.
- **Non-integer `n`:** `fibonacci(2.5)` also returns `undefined`, since there's no slot numbered `2.5`. Same reasoning applies.
- **Big `n`:** from `fibonacci(79)` onward, the result is larger than `Number.MAX_SAFE_INTEGER`. JavaScript numbers then quietly lose precision, so you get a wrong answer with no error. The fCC tests stop at 15, so they'd never show you this.

## 3. What you did well (keep doing it!)

- **Base cases come from the data, not from `if`s.** Starting with `[0, 1]` and returning `sequence[n]` means `n = 0` and `n = 1` just work. That's an elegant habit: when your starting data is set up right, special cases often disappear.
- **Loop bounds are exactly right.** `let i = 2; i <= n` starts at the first unknown value and includes `n` itself. Off-by-one errors are the classic mistake in loops like this, and you avoided both.
- **You test with `console.log(fibonacci(10))` at the bottom.** A quick check against a known answer (55) is a great habit.
- **You review even the easy ones.** That's how the easy ones become things you truly understand.

## Look ahead (optional)

- **Two variables instead of an array:** each step only needs the previous two numbers, so you could keep just `prev` and `curr` and drop the array. Memory use then stays constant instead of growing with `n`. The lab requires the `sequence` array, so this isn't a criticism. It's the usual next optimization in DP: once you see which parts of the table you actually read, you can often keep only those.
- **`BigInt`:** writing `0n` and `1n` instead of `0` and `1` lets JavaScript handle arbitrarily large integers exactly. That fixes the `fibonacci(79)` problem.
- **Reusing the table across calls:** right now `sequence` is created fresh on every call, so `fibonacci(15)` followed by `fibonacci(16)` starts from zero both times. If the table lived outside the function, later calls could reuse earlier work. That's where DP pays off most, though this lab's rules keep the array inside the function.

Nice work! On to the Prime Number Sum Calculator 🚀
