function pandigitalProducts(n) {
  const products = new Set();
  const multiplierLimit = getMultiplierLimit(n);
  for (let a = 1; a < multiplierLimit; a++) {
    for (let b = a; b < multiplierLimit; b++) {
      const p = a * b;
      const digitCount = countDigits(a, b, p);
      if (digitCount > n) {
        break;
      }
      if (digitCount === n && hasAllDigits(n, a, b, p)) {
        products.add(p);
      }
    }
  }

  const productsSum = products.values().reduce((sum, p) => sum + p, 0);
  return productsSum;
}

function getMultiplierLimit(digitCount) {
  const maxMultiplierDigit = Math.ceil(digitCount / 2) - 1;
  return 10 ** maxMultiplierDigit;
}

function countDigits(a, b, p = a * b) {
  return getDigitCount(a) + getDigitCount(b) + getDigitCount(p);
}

// previously a string-based check (split().sort() then checked). remember that math is cheap
function hasAllDigits(n, a, b, p = a * b) {
  const seen = Array(n + 1).fill(false);
  for (let number of [a, b, p]) {
    while (number > 0) {
      const digit = number % 10;
      if (digit === 0 || digit > n || seen[digit]) return false;

      seen[digit] = true;
      number = Math.floor(number / 10);
    }
  }
  return true;
}

function getDigitCount(n) {
  let digitCount = 0;
  while (n > 0) {
    digitCount++;
    n = Math.floor(n / 10);
  }
  return digitCount;
}

console.log(pandigitalProducts(4));
console.log(pandigitalProducts(6));
console.log(pandigitalProducts(7));
console.log(pandigitalProducts(8));
console.time("tests");
console.log(pandigitalProducts(9));
console.timeEnd("tests");
