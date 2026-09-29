console.log("— Prime Number Sum Calculator, after DP reattempt—\n");

function sumPrimes(n, primes = []) {
  if (n < 2) return 0;

  let sumPrev = sumPrimes(n - 1, primes);
  let isPrime = true;
  for (const p of primes) {
    if (p ** 2 > n) break;

    if (n % p === 0) {
      isPrime = false;
      break;
    }
  }

  if (isPrime) primes.push(n);
  return sumPrev + (isPrime ? n : 0);
}

console.log(sumPrimes(10));
console.log(sumPrimes(5));
console.log(sumPrimes(2));
console.log(sumPrimes(0));
console.log(sumPrimes(977));
