console.log("-- Prime Number Sum Calculator --\n");

function sumPrimes(num) {
  if (num < 2) return 0;

  const primes = [];

  for (let i = 2; i <= num; i++) {
    let isPrimeNumber = true;

    for (const prime of primes) {
      if (prime ** 2 > i) break;

      if (i % prime === 0) {
        isPrimeNumber = false;
        break;
      }
    }

    if (isPrimeNumber) primes.push(i);
    console.log(primes);
  }

  return primes.reduce((total, prime) => total + prime, 0);
}

console.log(sumPrimes(9));
