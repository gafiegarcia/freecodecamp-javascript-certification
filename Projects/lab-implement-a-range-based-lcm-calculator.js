console.log("— Range-Based LCM Calculator —\n");

const smallestCommons = array => {
  // input validation (allowing negatives but turning it into positives below)
  if (!Array.isArray(array) || array.length !== 2 || !Number.isInteger(array[0]) || !Number.isInteger(array[1])) {
    throw new Error("input should be an array of two integers!");
  }

  const input = [...array]
    .map(num => Math.abs(num)) // review: could be simplified with just `.map(Math.abs)`
    .sort((a, b) => a - b)
  ;
  // review: can just use `const [min, max]` instead of `input[0]` and `input[1]` scattered all over the place.
  
  // limiter for the main `for` loop
  let guaranteedCM = 1; // review: `upperBound` or `maxPossibleCM` reads better according to Claude...
  for (let i = input[0]; i <= input[1]; i++) {
    guaranteedCM *= i;
  }
  
  // helper function to check common multiple
  const isCM = num => {
    for (let i = input[0]; i <= input[1]; i++) {
      if (num % i !== 0) {
        return false;
      }
    }
    return true;
  }

  // MAIN loop
  for (let i = input[1]; i <= guaranteedCM; i += input[1]) {
    if (isCM(i)) {
      return i;
    }
  }

  // just so that linters don't get mad
  return guaranteedCM;
  // review: turns out this is not needed in plain JS, but kay
}

// tests
console.log(smallestCommons([1, 5])); // 60
console.log(smallestCommons([5, 1])); // 60
console.log(smallestCommons([2, 10])); // 2520
console.log(smallestCommons([1, 13])); // 360360
console.log(smallestCommons([23, 18])); // 6056820


/* Notes from Opus 4.7

  - Performance curiosity, not a fix: guaranteedCM grows enormously fast. For [1, 13] it's 13! = 6,227,020,800. For [1, 20] it'd be 20! ≈ 2.4 × 10^18, which exceeds Number.MAX_SAFE_INTEGER. Your code would still work because the loop finds the answer way before hitting the ceiling, but the ceiling itself becomes unreliable. Don't change anything — just file away "factorials explode" as a JS gotcha.

  - The classic LCM approach uses GCD — there's a beautiful identity: lcm(a, b) = (a * b) / gcd(a, b), and you can extend it across a range by folding: lcm(lcm(lcm(1,2),3),4).... The Euclidean algorithm for GCD is one of the most elegant things in CS and worth learning after this lab, not instead of your current solution. Your brute-force approach is more intuitive and totally appropriate for the lab.

*/

// REATTEMPT with Euclidean algorithm (no validation)

const smallestCommons2 = array => {
  const [x, y] = array.map(Math.abs);
  const min = Math.min(x, y);
  const max = Math.max(x, y);

  const gcd = (a, b) => {
    while (a !== 0) {
      [b, a] = [a, b % a];
    }
    return b;
  }

  const lcm = (a, b) => {
    return (a === 0 || b === 0)
      ? 0
      : (a * b) / gcd(a, b);
  }

  let result = min;
  for (let i = min + 1; i <= max; i++) {
    result = lcm(result, i);
  }
  return result;
}

// tests2
console.log(smallestCommons2([1, 5])); // 60
console.log(smallestCommons2([5, 1])); // 60
console.log(smallestCommons2([2, 10])); // 2520
console.log(smallestCommons2([1, 13])); // 360360
console.log(smallestCommons2([23, 18])); // 6056820
