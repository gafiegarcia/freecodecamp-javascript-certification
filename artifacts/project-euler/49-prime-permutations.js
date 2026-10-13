const toSortedStr = (str) => str.split("").sort().join("");

const getPrimeSieve = (limit) => {
  const isPrime = Array(limit + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= limit; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= limit; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime;
};

const isPrime = getPrimeSieve(9999);

const getCommonDifferenceSequence = (arr) => {
  for (let i = 0; i < arr.length - 2; i++) {
    for (let j = i + 1; j < arr.length - 1; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (
          Number(arr[k]) - Number(arr[j]) ===
          Number(arr[j]) - Number(arr[i])
        ) {
          return [arr[i], arr[j], arr[k]];
        }
      }
    }
  }
  return null;
};

function primePermutations() {
  const fourDigitPrimes = [];
  for (let i = 1000; i <= 9999; i++) {
    if (isPrime[i]) {
      fourDigitPrimes.push(String(i));
    }
  }

  const groups = new Map();
  for (let i = 0; i < fourDigitPrimes.length; i++) {
    const current = fourDigitPrimes[i];
    const key = toSortedStr(current);
    if (groups.has(key)) {
      groups.get(key).push(current);
    } else {
      groups.set(key, [current]);
    }
  }

  const unusualSequences = groups
    .values()
    .filter((sequence) => sequence.length >= 3)
    .map(getCommonDifferenceSequence)
    .filter((sequence) => sequence);
  // since it asked for the "other result", picking what doesn't start with "1487"
  const not1487UnusualSequence = unusualSequences.find(
    (sequence) => sequence[0] !== "1487",
  );
  return Number(not1487UnusualSequence.join(""));
}

console.time("single run");
console.log(primePermutations());
console.timeEnd("single run");
