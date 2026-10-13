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

// "Which prime, below ONE-MILLION, can be written as
// the sum of the most consecutive primes?"
const isPrime = getPrimeSieve(1000000);
const primes = [];
for (let i = 2; i < isPrime.length; i++) {
  if (isPrime[i]) primes.push(i);
}

const sumArrItems = (arr, start, end) => {
  let sum = 0;
  for (let i = start; i < end; i++) {
    sum += arr[i];
  }
  return sum;
};

function consecutivePrimeSum(limit) {
  let longestConsecutive = 1;
  let sumConsecutive;
  // first prime is 2 at index 0
  for (
    let start = 0;
    sumArrItems(primes, start, start + longestConsecutive) < limit;
    start++
  ) {
    let sum = primes[start];
    let end = start;
    while (sum + primes[end + 1] < limit) {
      end++;
      sum += primes[end];
      if (isPrime[sum]) {
        const length = end - start + 1;
        if (length > longestConsecutive) {
          longestConsecutive = length;
          sumConsecutive = sum;
        }
      }
    }
  }

  return sumConsecutive;
}

console.time("1x two logs");
console.log(consecutivePrimeSum(1000));
console.log(consecutivePrimeSum(1000000));
console.log(consecutivePrimeSum(17));
console.log(consecutivePrimeSum(1051));
console.timeEnd("1x two logs");
