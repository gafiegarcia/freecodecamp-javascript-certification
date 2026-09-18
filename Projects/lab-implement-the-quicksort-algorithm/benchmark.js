// Usage:  node benchmark.js <your-quicksort-file.js>
//
// Checks two things about a quicksort implementation:
//   1. Does it sort correctly, on a lot of awkward inputs?
//   2. Does it stay O(n log n), or does it secretly go O(n^2) on some shape?
//
// How the O(n^2) check works (no changes to your file needed):
// run the same shape at size n, then at size 2n, and compare the time.
//   O(n log n) -> roughly 2x slower       (a bit more, because of the log)
//   O(n^2)     -> roughly 4x slower
// A blown call stack counts as an instant fail: quadratic depth means
// quadratic recursion, and JS runs out of stack long before it finishes.

const fs = require("fs");
const path = require("path");

// The file being tested may print things (a demo at the bottom, a stray
// console.log left inside a helper). That would flood this report and slow
// down the timings, so console.log is muted for the whole run and this
// script prints through `report` instead.
const report = console.log.bind(console);
console.log = () => {};

// ---------------------------------------------------------------- load

function loadQuicksort(file) {
  const source = fs.readFileSync(file, "utf8");
  const fn = new Function(
    source + "\n;return typeof quicksort === 'function' ? quicksort : null;"
  )();
  if (!fn) {
    report(`No function named 'quicksort' found in ${file}`);
    process.exit(1);
  }
  return fn;
}

// ---------------------------------------------------------------- shapes

const shapes = {
  "random": (n) => {
    const a = [];
    for (let i = 0; i < n; i++) a.push(Math.floor(Math.random() * 1e9));
    return a;
  },
  "sorted": (n) => {
    const a = [];
    for (let i = 0; i < n; i++) a.push(i);
    return a;
  },
  "reverse sorted": (n) => {
    const a = [];
    for (let i = n; i > 0; i--) a.push(i);
    return a;
  },
  "organ pipe": (n) => {
    const a = [];
    for (let i = 0; i < n / 2; i++) a.push(i);
    for (let i = Math.floor(n / 2); i > 0; i--) a.push(i);
    return a;
  },
  "inverted pipe": (n) => {
    const a = [];
    for (let i = Math.floor(n / 2); i > 0; i--) a.push(i);
    for (let i = 0; i < n / 2; i++) a.push(i);
    return a;
  },
  "sawtooth": (n) => {
    const a = [];
    for (let i = 0; i < n; i++) a.push(i % 50);
    return a;
  },
  "few unique values": (n) => {
    const a = [];
    for (let i = 0; i < n; i++) a.push(Math.floor(Math.random() * 5));
    return a;
  },
  "all identical": (n) => {
    const a = [];
    for (let i = 0; i < n; i++) a.push(7);
    return a;
  },
};

// ---------------------------------------------------------------- helpers

function isSorted(a) {
  for (let i = 1; i < a.length; i++) {
    if (a[i - 1] > a[i]) return false;
  }
  return true;
}

function sameContents(before, after) {
  const count = new Map();
  for (const v of before) count.set(v, (count.get(v) || 0) + 1);
  for (const v of after) {
    const c = count.get(v);
    if (!c) return false;
    count.set(v, c - 1);
  }
  return [...count.values()].every((c) => c === 0);
}

// Runs quicksort a few times and returns the middle timing, so one unlucky
// run (garbage collection, background app) does not decide the verdict.
// Returns null if it blew the call stack.
function timeIt(quicksort, input, runs) {
  const times = [];
  for (let r = 0; r < runs; r++) {
    const copy = input.slice();
    const t0 = performance.now();
    try {
      quicksort(copy);
    } catch (err) {
      if (err instanceof RangeError) return null; // stack overflow
      throw err;
    }
    times.push(performance.now() - t0);
  }
  times.sort((a, b) => a - b);
  return times[Math.floor(times.length / 2)];
}

// ---------------------------------------------------------------- correctness

function correctnessCheck(quicksort) {
  let failures = 0;

  // hand-picked awkward little cases
  const edge = [
    [], [1], [2, 1], [1, 2], [1, 1], [3, 1, 2], [1, 1, 1],
    [2, 1, 1], [1, 2, 1], [5, 4, 3, 2, 1], [0, -1, -5, 3, -5],
  ];
  for (const input of edge) {
    const copy = input.slice();
    let result;
    try {
      result = quicksort(copy);
    } catch (err) {
      report(`  FAIL  threw on [${input.join(", ")}] — ${err.message}`);
      failures++;
      continue;
    }
    const out = result === undefined ? copy : result;
    if (!isSorted(out) || !sameContents(input, out)) {
      report(`  FAIL  [${input.join(", ")}] -> [${out.join(", ")}]`);
      failures++;
    }
  }

  // random arrays, deliberately full of duplicates
  for (let t = 0; t < 20000; t++) {
    const n = Math.floor(Math.random() * 40);
    const ceiling = 1 + Math.floor(Math.random() * 15);
    const input = [];
    for (let i = 0; i < n; i++) input.push(Math.floor(Math.random() * ceiling));

    const copy = input.slice();
    let result;
    try {
      result = quicksort(copy);
    } catch (err) {
      report(`  FAIL  threw on [${input.join(", ")}] — ${err.message}`);
      failures++;
      break;
    }
    const out = result === undefined ? copy : result;
    if (!isSorted(out) || !sameContents(input, out)) {
      report(`  FAIL  [${input.join(", ")}] -> [${out.join(", ")}]`);
      failures++;
      break;
    }
  }

  if (failures === 0) {
    report("  all correctness checks passed (edge cases + 20,000 random arrays)");
  }
  return failures;
}

// ---------------------------------------------------------------- scaling

function scalingCheck(quicksort, n, runs) {
  report(
    "  " +
      "input shape".padEnd(20) +
      `n=${n}`.padStart(11) +
      `n=${n * 2}`.padStart(11) +
      "growth".padStart(9) +
      "   verdict"
  );
  report("  " + "-".repeat(63));

  let problems = 0;

  for (const name of Object.keys(shapes)) {
    const small = shapes[name](n);
    const large = shapes[name](n * 2);

    const tSmall = timeIt(quicksort, small, runs);
    const tLarge = tSmall === null ? null : timeIt(quicksort, large, runs);

    let cSmall, cLarge, growth, verdict;

    if (tSmall === null || tLarge === null) {
      cSmall = tSmall === null ? "STACK" : tSmall.toFixed(1) + "ms";
      cLarge = "STACK";
      growth = "-";
      verdict = "FAIL — blew the call stack";
      problems++;
    } else {
      const ratio = tLarge / tSmall;
      cSmall = tSmall.toFixed(1) + "ms";
      cLarge = tLarge.toFixed(1) + "ms";
      growth = ratio.toFixed(1) + "x";
      if (ratio >= 3.2) {
        verdict = "FAIL — looks O(n^2)";
        problems++;
      } else if (ratio >= 2.6) {
        verdict = "suspicious";
      } else {
        verdict = "ok";
      }
    }

    report(
      "  " +
        name.padEnd(20) +
        cSmall.padStart(11) +
        cLarge.padStart(11) +
        growth.padStart(9) +
        "   " +
        verdict
    );
  }

  return problems;
}

// ---------------------------------------------------------------- main

const file = process.argv[2];
if (!file) {
  report("Usage: node benchmark.js <your-quicksort-file.js>");
  process.exit(1);
}

const n = Number(process.argv[3]) || 10000;
const runs = Number(process.argv[4]) || 3;
const quicksort = loadQuicksort(path.resolve(file));

report(`\nBenchmarking ${path.basename(file)}\n`);
report("Correctness");
const wrong = correctnessCheck(quicksort);

report("\nScaling  (doubling n should roughly double the time)");
const problems = scalingCheck(quicksort, n, runs);

report("");
if (wrong > 0) {
  report("Result: it does not sort correctly. Fix that before reading the timings.");
} else if (problems > 0) {
  report(`Result: sorts correctly, but ${problems} input shape(s) go quadratic.`);
} else {
  report("Result: sorts correctly, and no input shape went quadratic.");
}
report("");
