console.log("— Prime Number Sum Calculator —\n");

const isPrime = num => {
  if (num <= 1) return false;
  if (num === 2) return true; // review: this line isn't needed; look below
  for (let i = 2; i < num; i++) { // review: if `a * b = num`, then a & b CAN'T BOTH BE BIGGER THAN √num -> should only check up until √num instead of num
    if (num % i === 0) return false;
  }
  return true;
}

const sumPrimes = num => {
  // if (num < 2) return 0; commenting this one out because I realized it might not be needed at all

  let result = 0;
  for (let i = 2; i <= num; i++) { // review: the most efficient, "production-grade" logic for this function is using something called "Sieve of Eratosthenes" -> premade array up to √num with `.fill()` method, which I haven't learned atp, and eliminating all multiples of prime numbers starting from 2 -> and so on. fcc definitely haven't taught this yet atp.
    if (isPrime(i)) result += i;
  }

  return result;
}

console.log(sumPrimes(10)) // 17
console.log(sumPrimes(5)) // 10
console.log(sumPrimes(2)) // 2
console.log(sumPrimes(0)) // 0
console.log(sumPrimes(977)) // 73156
