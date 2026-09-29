Got the fCC user stories. Next I'll run your files and check how the DP one handles large inputs.

# Review: Prime Number Sum Calculator (v2 and the DP retry)

**Overall:** All three versions pass the fCC tests. I ran the DP file and got `17, 10, 2, 0, 73156`, which is correct. The nice part is that your v2 and your new DP version use almost the same idea. One is written as a loop and the other as recursion.

## Your main question: does v2 already use DP with tabulation?

**Yes, in spirit.** Here's why. Tabulation means you build up answers from the smallest case, save them in a table, and reuse them for bigger cases. Compare v2 with your Fibonacci lab:

| | Fibonacci lab | v2 |
|---|---|---|
| Direction | bottom-up, from `i = 2` | bottom-up, from `i = 2` |
| Table | `sequence` | `primes` |
| Reuse | `sequence[i-1] + sequence[i-2]` | test `i` only against the primes you already found |

The "aha" in v2 is line 11: `for (const prime of primes)`. You don't recheck every number. You only divide by primes you already saved, so earlier work speeds up later work. That's the whole idea of DP.

**An honest caveat:** DP purists would say this problem doesn't have *overlapping subproblems* the way Fibonacci does. In Fibonacci, `fib(5)` asks for `fib(3)` twice, so a cache saves repeated work. Summing primes is more like "keep a list of useful stuff as you go," so it's a mild kind of DP. That's probably why fCC placed it right after Fibonacci: to practise "save and reuse."

### What your new DP version actually is

`-dp.js` is **top-down recursion**, but it isn't memoization.

- **Memoization means caching the *answers*,** like saving `sumPrimes(7)` so you never compute it again. Your code never saves the answers themselves. It saves the same `primes` list that v2 saves.
- **Memoization wouldn't help anyway.** Each `sumPrimes(k)` gets called only once. It's a single chain (10 → 9 → 8 …), not a branching tree like Fibonacci's.

So `-dp.js` is v2 turned inside out. The recursion walks down to 2, and the real work happens as each call *returns*, going back up.

The cleanest DP statement of this problem is actually your line 18:

```
sumPrimes(n) = sumPrimes(n - 1) + (n is prime ? n : 0)
```

That's a recurrence, the same kind of rule as `fib(n) = fib(n-1) + fib(n-2)`. You wrote it naturally. 🎉

## 1. Is there a more efficient or idiomatic solution (using what you've learned so far)?

**Use the recurrence in the loop version too.** v2 builds `primes` and then adds everything up with `reduce` at the end. The tabulation way is a running total, where each step's answer builds on the previous one:

```js
let sum = 0;
for (let i = 2; i <= num; i++) {
  // ...same prime check...
  if (isPrimeNumber) {
    primes.push(i);
    sum += i;   // sum is "sumPrimes(i)" at this point
  }
}
return sum;
```

Why keep one number instead of a `sums[]` table? Each step only needs the previous answer. When that happens, the table shrinks to a single variable. Your Fibonacci lab could do the same with two variables instead of a whole array. It's the same kind of saving as dropping the `reduce` pass.

**In `-dp.js`**, line 18 checks `isPrime` a second time. You could fold it into the `if` instead. This is optional:

```js
if (isPrime) {
  primes.push(n);
  return sumPrev + n;
}
return sumPrev;
```

## 2. Beginner pitfalls worth fixing

1. **`-dp.js` crashes on big inputs.** I tested it: `sumPrimes(10000)` throws `Maximum call stack size exceeded`. Every recursive call waits on the call stack, and JavaScript only allows a few thousand of them. Picture a stack of 10,000 plates, where each plate is waiting for the one below it. v2's loop runs `sumPrimes(100000)` without trouble. This is the main real-world reason **tabulation (loops) is often preferred over recursion**, and it's worth remembering for the DP quiz.
2. **v2 line 21: a leftover `console.log(primes)` inside the loop.** It prints the whole array on every step, which is 977 prints for the fCC test input. It's fine while you're debugging, but remove it before you submit. It's a good habit to build now.
3. **`-dp.js` line 6: `let sumPrev` should be `const`.** It never gets reassigned.
4. **The hidden `primes` parameter is part of the public signature (`-dp.js` line 3).** Someone could call `sumPrimes(10, [2, 3])` and get a wrong answer. It's minor here, but if you want to hide it, use an inner helper function:

   ```js
   function sumPrimes(n) {
     const primes = [];
     function helper(k) { /* your recursive logic, using primes */ }
     return helper(n);
   }
   ```

   *Good news:* `primes = []` as a default value creates a fresh array on every top-level call. I checked, and calling `sumPrimes(10)` twice gives `17` both times. So you're not leaking state between calls.

## 3. What you did well (keep doing this!)

- **`p ** 2 > n` to stop early** (v2 line 12, `-dp.js` line 9). You carried over the √num insight from your v1 review notes, and squaring avoids calling `Math.sqrt` on every loop. 👏
- **Recursing *before* checking in `-dp.js`.** Because you call `sumPrimes(n - 1)` first, `primes` fills up smallest-first, so the break on line 9 is safe. If you'd checked `n` before recursing, `primes` would still be empty or in the wrong order, and the early break would give wrong answers. I'm not sure you did this on purpose, but it's exactly right.
- **Early return for `n < 2`**, matching user story #3.
- **Clear names** like `isPrimeNumber` and `sumPrev`, plus a README that documents your process. Your v1 review comments are a great learning log.

## Look ahead

The **Sieve of Eratosthenes**, which you already noted in v1, is the tabulation version of this problem. You make a table of `true`/`false` for every number up to `num`, then cross out the multiples of each prime. There's no division at all, and it's faster than trial division. It's worth trying once you're comfortable with `Array(n).fill()`.

**Suggestion for your README:** v2 is the tabulation version (bottom-up, with a table of known primes). `-dp.js` is the top-down recursive version of the same idea, not memoization. That's a nice pair to keep side by side. 🚀

# me: Asking about Sieve of Eratosthenes

"recursing before checking in" ummm .. so I initially wrote (confidently btw) `return sumPrimes(n-1, primes) + (isPrime ? n : 0);` like I just wrote the most beautiful DP return line ever... only to realize the result was wrong xD then I stared at the screen for a minute and finally realized my mistake.

and... I didn't really read v1 before this dp version... so I just realized that... I've definitely reviewed this project a long time ago! I just didn't notice and don't remember. Anyway, for the "Sieves of Erathostenes" thing, can you write how it would be implemented? now I'm curious, since I've learned Array.fill() at least, so...curious

...

# Claude

Your "beautiful DP return line" bug is a great one to have hit yourself. 😄

## Why the one-liner went wrong

In your first version, the prime check ran **before** the recursive call. At the top call (`n = 10`), `primes` was still empty. The loop had nothing to divide by, so 10 counted as prime and got pushed. Next, at `n = 9`, the list was `[10]`. Since `10 ** 2 > 9`, the loop stopped straight away, so 9 counted as prime too. That kept happening all the way down, so every number counted as prime. I ran it: `sumPrimes(10)` gives `54`, which is 2 + 3 + … + 10.

Think of it as checking an answer sheet before anyone has written on it. Recursing first means the smaller numbers fill in the sheet before the bigger numbers look at it.

## Sieve of Eratosthenes

The idea: write down every number from 0 to `num` and mark them all "maybe prime." Take the first prime, 2, and cross out all its multiples. Move to the next number that isn't crossed out (3) and cross out its multiples. Keep going. Whatever is left uncrossed is prime. There's **no division** at all, just crossing things out.

```js
function sumPrimes(num) {
  if (num < 2) return 0;

  // The table: isPrime[i] answers "is i prime?"
  const isPrime = Array(num + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let p = 2; p * p <= num; p++) {
    if (!isPrime[p]) continue; // already crossed out → its multiples are too

    for (let multiple = p * p; multiple <= num; multiple += p) {
      isPrime[multiple] = false; // cross out
    }
  }

  let sum = 0;
  for (let i = 2; i <= num; i++) {
    if (isPrime[i]) sum += i;
  }
  return sum;
}
```

I tested it: `17, 10, 2, 0, 73156`, all correct. `sumPrimes(1_000_000)` also finishes instantly.

Three details worth understanding:

- **`Array(num + 1)`**: the `+ 1` is there so that index `num` exists. Then `isPrime[i]` lines up directly with the number `i`.
- **Crossing out starts at `p * p`, not `2 * p`.** Smaller multiples like `3 × 2` were already crossed out when you handled 2. So for 5, you start at 25, because 10, 15 and 20 are already gone.
- **The outer loop stops at `p * p <= num`.** This is the same √num idea you use in v1 and v2. One small correction to your old v1 comment: the *array* still goes all the way up to `num`. Only the crossing-out loop stops at √num.

This is also **tabulation in its purest form**: a table built bottom-up, where each entry is decided by earlier work.

## README

I added a short "Update: after the review with Claude" section to [README.md](Projects/lab-build-a-prime-number-sum-calculator/README.md). It covers v2 being tabulation, the DP version being top-down recursion (not memoization), the recurse-first bug giving `54`, the call-stack crash at 10,000, and the sieve as a look-ahead. It isn't staged yet.
