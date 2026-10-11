const PRIMES = generatePrimeTable(1000000);
function circularPrimes(limit) {
  const cp = new Set();
  const seen = new Set();

  for (let i = 2; i < limit; i++) {
    if (seen.has(i)) continue;

    const circularNums = getCircularNumbers(i);
    circularNums.forEach((n) => seen.add(n));

    if (isPrime(i) && circularNums.every(isPrime)) {
      cp.add(i);
      circularNums.forEach((n) => {
        if (n < limit) {
          cp.add(n);
        }
      });
    }
  }
  return cp.size;
}

console.time("all tests");
console.log(circularPrimes(100)); // 13
console.log(circularPrimes(100000)); // 43
console.log(circularPrimes(250000)); // 45
console.log(circularPrimes(500000)); // 49
console.log(circularPrimes(750000)); // 49
console.log(circularPrimes(1000000)); // 55
console.timeEnd("all tests");

function getCircularNumbers(n) {
  const digitCount = toDigitCount(n);
  const numbers = [];
  for (let i = 0; i < digitCount - 1; i++) {
    const lastDigit = n % 10;
    n = lastDigit * 10 ** (digitCount - 1) + Math.floor(n / 10);
    numbers.push(n);
  }
  return numbers;
}

function generatePrimeTable(limit) {
  const table = Array(limit + 1).fill(true);
  table[0] = false;
  table[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (table[i]) {
      for (let j = i * i; j <= limit; j += i) {
        table[j] = false;
      }
    }
  }

  return table;
}

function isPrime(n) {
  const cachedIsPrime = PRIMES[n];
  if (cachedIsPrime !== undefined) return cachedIsPrime;

  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function toDigitCount(n) {
  let count = 0;
  let remaining = n;
  while (remaining > 0) {
    count++;
    remaining = Math.floor(remaining / 10);
  }
  return count;
}
