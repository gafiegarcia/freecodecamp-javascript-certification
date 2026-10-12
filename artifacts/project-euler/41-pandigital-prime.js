// const isPandigital = (numStr) => {
//   // 1-based, so digit "1" is at index 0
//   const seen = Array(numStr.length).fill(false);
//   for (const digit of numStr) {
//     if (seen[digit - 1] || seen[digit - 1] === undefined) {
//       return false;
//     }
//     seen[digit - 1] = true;
//   }
//   return true;
// };

// will make use of a sieve, looped over backwards
// function pandigitalPrime(n) {
//   const limit = 10 ** n;
//   const isPrimes = Array(10 ** n).fill(true);
//   isPrimes[0] = false;
//   isPrimes[1] = false;
//
//   //  "<" instead of "<=" because max number of n-digit is 10^n - 1
//   for (let i = 2; i * i < limit; i++) {
//     for (let j = i * i; j <= isPrimes.length; j += i) {
//       isPrimes[j] = false;
//     }
//   }
//
//   // ここからは本番だ
//   for (let i = isPrimes.length - 1; i >= 0; i--) {
//     if (isPrimes[i] && isPandigital(String(i))) return i;
//   }
//
//   return null;
// }
// first attempt: 280ms. too long, will try simple isPrime helper

const isPrime = (n) => {
  if (n < 2) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

function pandigitalPrime(n) {
  const digits = Array.from({ length: n }, (_, i) => i + 1);

  const nDigitMinNumber = 10 ** (n - 1);
  // my favorite: stack-based DFS
  const stack = [...digits];
  while (stack.length > 0) {
    const current = stack.pop();
    // ">" because...pandigital can't have zeros
    if (current > nDigitMinNumber) {
      if (isPrime(current)) {
        return current;
      }
      continue;
    }

    const currentStr = String(current);
    for (const digit of digits) {
      if (currentStr.includes(String(digit))) continue;
      stack.push(current * 10 + digit);
    }
  }

  return null;
}
// second attempt 3ms for TWO tests. so it's good

console.time("label");
console.log(pandigitalPrime(4));
console.log(pandigitalPrime(7));
console.timeEnd("label");
