console.log("— Range of Numbers Generator —\n");

function rangeOfNumbers(startNum, endNum) {
  if (startNum > endNum) {
    console.error("startNum cannoot be bigger than endNum");
    return;
  }

  if (startNum === endNum) return [startNum];

  return [startNum, ...rangeOfNumbers(startNum + 1, endNum)];
}

// I don't know man... since discovering the
// return [curr, recursion(curr +- 1)] pattern I feel like I'm just plain cheating right now
// it's so OP I basically just rewrite the logic from previous project, the build a countdown one, and modify it a bit

// claude told me that the .unshift() and .shift() are O(n) operations. and each ...spread call copies the whole array-so-far into a new array, and might be computationally more taxing per stack (definitely not for rangeOfNumbers(5) but...; read below for speed difference).
// so this v2 is way faster than v1 (within a window before stack overflow error; read claude notes below) as .push() is O(1)-ish (+the rare spikes when allocated memory is full, where memory reallocation happens (today's v8 engine reallocate 150%) and the whole array is copied—but as the growth of allocation is geometric/exponential, the spikes don't matter that much and the operation is still considered O(1)-amortized)
// my theory is that my original solution wastes compute on copying an array, spreading it and discard it at each call stack while this v2 store a single array in `result` and just... "hands" it over to the parent call stacks while doing O(1) operation in each—much cheaper I guess

/*
function rangeOfNumbersv2(startNum, endNum, result = []) {
  if (startNum > endNum) {
    console.error("startNum cannoot be bigger than endNum");
    return;
  }

  if (startNum === endNum) {
    console.log("base case reached!");
    console.log(`startNum: ${startNum} — endNum: ${endNum}`);
    console.log(`result is: ${result}`);
    result.push(startNum);
    return result;
  }
  console.log("result pre-push: " + result);
  result.push(startNum);
  console.log("result post-push: " + result);
  return rangeOfNumbersv2(startNum + 1, endNum, result);
}

const testRun = rangeOfNumbersv2(3, 5);
console.log(testRun);
console.log(typeof testRun);
*/

// update from claude

// recursive, range of 5,000 (100 runs):
/*
v1 (spread)     : 3994.0ms
v2 (accumulator): 4.4ms
-> v2 is 910x faster at n=5000
v3 (plain for loop) : 1.4ms

v3 with a range of 10,000,000: 10,000,000 items — no crash
*/

// the v3 in question: dead simple 🗿
/*
function v3(startNum, endNum) {
  const out = [];
  for (let i = startNum; i <= endNum; i++) out.push(i);
  return out;
}
*/

// real lesson: "in JavaScript, recursion over a linear sequence is the wrong tool."
// this example of linear sequence is used by fcc perhaps to simplify the teaching of the recursion concept, not that it's the best tool for this scenario

// ————— HOW LARGE A RANGE CAN EACH VERSION HANDLE? ————— (node v24, default)
/*
  version           speed (n=5,000)   MAX RANGE       what stops it
  v1 (spread)       3994.0ms          ~7,000          stack overflow
  v2 (accumulator)     4.4ms          ~6,300          stack overflow
  v3 (plain loop)      1.4ms          ~4.29 BILLION   max array length / RAM
*/

// so "v2 is better for very large ranges" (line 19) is WRONG: v2 is 910x faster,
// but only in the tiny window below ~6,300 where recursion works at all.
// speed and capacity are separate axes. v2 wins speed, v3 wins both.
// (v2 even crashes EARLIER than v1 — the extra `result` arg makes frames fatter.)

// WHY v3 survives — not "no call stack", it uses one frame. what differs is SCALING:
//   v1/v2 -> O(n) stack space: one frame per number, each with its own `startNum`
//   v3    -> O(1) stack space: ONE frame, with a single `i` reused
// recursion can't free any frame until the base case unwinds the whole chain.

// and there's no MAX_CALL_STACK constant — it's just bytes (v8 default ≈ 984 KB):
//   node d2.js  -> 6,250   |   node --stack-size=8000 d2.js -> 51,562  (8x mem ≈ 8x depth)
// don't actually do that: past the OS limit it segfaults instead of throwing. use a loop.

// v3's wall is different in kind: 2^32-1 max array length (RangeError: Invalid array
// length), RAM first in practice. it fails on the SIZE OF THE ANSWER, not on mechanics.

// takeaway: a slow function still returns an answer, a crashed one doesn't.
// check "does it crash?" before "is it fast?"
