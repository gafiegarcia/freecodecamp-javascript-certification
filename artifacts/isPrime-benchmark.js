// Version A: trial division, stop at square root
function isPrimeSqrt(num) {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
}

// Version B: 6k ± 1 (Gemini's version)
function isPrime6k(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

function nthPrime(n, isPrime) {
  let count = 0;
  let candidate = 1;
  while (count < n) {
    candidate++;
    if (isPrime(candidate)) count++;
  }
  return candidate;
}

function bench(label, isPrime, runs = 50) {
  for (let i = 0; i < 5; i++) nthPrime(10001, isPrime); // warm-up
  const times = [];
  let result;
  for (let i = 0; i < runs; i++) {
    const t0 = performance.now();
    result = nthPrime(10001, isPrime);
    times.push(performance.now() - t0);
  }
  times.sort((a, b) => a - b);
  const median = times[Math.floor(runs / 2)];
  console.log(
    `${label.padEnd(20)} result=${result}  median=${median.toFixed(3)} ms  min=${times[0].toFixed(3)} ms`,
  );
  return median;
}

// count modulo operations too (machine-independent measure)
function countOps(isPrimeCounted) {
  let ops = 0;
  const f = (num) => isPrimeCounted(num, () => ops++);
  nthPrime(10001, f);
  return ops;
}
const sqrtOps = countOps((num, tick) => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    tick();
    if (num % i === 0) return false;
  }
  return true;
});
const sixOps = countOps((num, tick) => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  tick();
  if (num % 2 === 0) return false;
  tick();
  if (num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    tick();
    if (num % i === 0) return false;
    tick();
    if (num % (i + 2) === 0) return false;
  }
  return true;
});

const a = bench("sqrt only", isPrimeSqrt);
const b = bench("6k ± 1", isPrime6k);
console.log(`\nspeedup: ${(a / b).toFixed(2)}x`);
console.log(
  `modulo checks — sqrt only: ${sqrtOps.toLocaleString()}, 6k±1: ${sixOps.toLocaleString()}, ratio ${(sqrtOps / sixOps).toFixed(2)}x`,
);
