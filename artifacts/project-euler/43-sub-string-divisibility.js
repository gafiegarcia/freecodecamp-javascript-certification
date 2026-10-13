const isPrime = (n) => {
  if (n < 2) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
};

function* primes(amount) {
  let count = 0;
  // first prime
  let i = 2;
  while (count < amount) {
    while (!isPrime(i)) {
      i++;
    }
    count++;
    yield i;
    i++;
  }
}

const hasDuplicateDigits = (str) => {
  for (let i = 0; i < str.length; i++) {
    if (str.lastIndexOf(str[i]) !== i) return true;
  }
  return false;
};

const hasOutOfRangeDigits = (maxAllowedDigit, str) => {
  for (const digit of str) {
    if (Number(digit) > maxAllowedDigit) return true;
  }
  return false;
};

const seedLastThreeDigits = (firstPrime, maxAllowedDigit) => {
  let multiplier = 1;
  const result = [];

  while (firstPrime * multiplier < 1000) {
    const numStr = String(firstPrime * multiplier).padStart(3, "0");
    if (
      !hasDuplicateDigits(numStr) &&
      !hasOutOfRangeDigits(maxAllowedDigit, numStr)
    ) {
      result.push(numStr);
    }
    multiplier++;
  }

  return result;
};

const extendPandigitals = (candidates, maxAllowedDigit, divisor) => {
  const newPandigitals = [];

  for (const candidate of candidates) {
    const firstTwo = Number(candidate.slice(0, 2));

    for (let digit = 0; digit <= maxAllowedDigit; digit++) {
      if (candidate.includes(digit)) continue;

      const new3Digits = 100 * digit + firstTwo;
      if (new3Digits % divisor === 0) {
        newPandigitals.push(String(digit) + candidate);
      }
    }
  }

  return newPandigitals;
};

const getFirstPandigitalDigit = (pandigital, maxAllowedDigit) => {
  for (let i = 0; i <= maxAllowedDigit; i++) {
    if (!pandigital.includes(String(i))) return i;
  }
  return null;
};

function substringDivisibility(n) {
  const primesBiggestFirst = primes(n - 2)
    .toArray()
    .reverse();
  const [firstPrime, ...divisors] = primesBiggestFirst;

  let candidates = seedLastThreeDigits(firstPrime, n);

  for (const divisor of divisors) {
    candidates = extendPandigitals(candidates, n, divisor);
  }

  return candidates
    .map((numStr) => getFirstPandigitalDigit(numStr, n) + numStr)
    .reduce((sum, numStr) => sum + Number(numStr), 0);
}

// console.time("all tests x1");
// console.log(substringDivisibility(5)); // 12444480
// console.log(substringDivisibility(7)); // 1099210170
// console.log(substringDivisibility(8)); // 1113342912
// console.log(substringDivisibility(9)); // 16695334890
// console.timeEnd("all tests x1");

console.time("all tests x10");

for (let i = 0; i < 10; i++) {
  console.log(substringDivisibility(5));
  console.log(substringDivisibility(7));
  console.log(substringDivisibility(8));
  console.log(substringDivisibility(9));
}

console.timeEnd("all tests x10");
