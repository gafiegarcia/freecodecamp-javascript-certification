the first one and v2 were done when this project was listed way back in earlier modules; forgot what it was, perhaps in the Loops module or something, can't remember. It since moved to this module near the end, "Dynamic Programming", which now makes more sense (I guess).

During this third try (as I'm writing this [lab-build-a-prime-number-sum-calculator-dp.js](./lab-build-a-prime-number-sum-calculator-dp.js)), I'll try to not look into my [first](./lab-build-a-prime-number-sum-calculator.js) and [second submission](./lab-build-a-prime-number-sum-calculator-v2.js) which were written before I learned dynamic programming.

nvm I looked. the v2 probably already technically uses tabulation (need confirmation with Claude) so I don't know what I should do for now... recursion perhaps with memoization.

## Update from Claude: after the review

- **v2 = tabulation (bottom-up).** The `primes` array is the table: each new number is only checked against primes already found.
- **dp = top-down recursion, *not* memoization.** It saves the same `primes` list, not the answers (`sumPrimes(k)`). Each `sumPrimes(k)` runs only once anyway (a single chain, not a branching tree like Fibonacci), so memoizing wouldn't help. Its recurrence: `sumPrimes(n) = sumPrimes(n - 1) + (n is prime ? n : 0)`.
- **Recursion must happen *before* the prime check**, so `primes` is filled smallest-first. Checking first (my original one-liner return) made every number "prime" → `sumPrimes(10)` gave `54`.
- **Recursion depth limit:** the dp version crashes at `sumPrimes(10000)` (max call stack size exceeded); the v2 loop doesn't. That's a real reason to prefer tabulation.
- Look ahead: Sieve of Eratosthenes (a `true`/`false` table made with `.fill()`, crossing out multiples, no division needed).
