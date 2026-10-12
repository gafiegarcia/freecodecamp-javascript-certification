// for searchability: this `digitAt()` helper is SO GOOD for finding
// digit count of integers starting from 1 to n.
// 1-9 is 9 digit, 10-99 is 9*10 digit, 100-999 is 9*100 digit, so the pattern repeats.
// with this, no `digitCount()` helper is needed, as digit count for each number
// is tracked by `width`
const digitAt = (position) => {
  let width = 1;
  let count = 9;
  let start = 1;

  while (position > width * count) {
    position -= width * count;
    width++;
    count *= 10;
    start *= 10;
  }

  const index = position - 1;
  const number = start + Math.floor(index / width);
  const digit = String(number)[index % width];
  return Number(digit);
};

// input is powers of 10, as per the challenge
function champernownesConstant(n) {
  let product = 1;
  for (let p = 1; p <= n; p *= 10) {
    product *= digitAt(p);
  }
  return product;
}

console.time("tests");
console.log(champernownesConstant(100));
console.log(champernownesConstant(1000));
console.log(champernownesConstant(1000000));
console.timeEnd("tests");
