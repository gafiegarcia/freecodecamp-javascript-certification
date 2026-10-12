// this is v2. first attempt is on the previous commit
// rules first:
// 1. a^2 + b^2 = c^2 (pythagorean)
// 2. a + b > c (triangle rule) 3 + 4 > 7 ; b > c - a
// 3. a < b (I guess?)
const getLongestEdge = (a, b) => Math.sqrt(a ** 2 + b ** 2);

const getMaxPropVal = (obj) => {
  let maxProp;
  let maxVal = 0;
  for (const [prop, val] of Object.entries(obj)) {
    if (val > maxVal) {
      maxVal = val;
      maxProp = prop;
    }
  }
  return Number(maxProp);
};

function intRightTriangles(n) {
  const solutions = {};
  for (let a = 3; a < n / 3; a++) {
    for (let b = a + 1; b < (n - a) / 2; b++) {
      const c = getLongestEdge(a, b);
      const perimeter = a + b + c;
      if (perimeter > n) break;
      if (!Number.isInteger(c)) continue;

      solutions[perimeter] = (solutions[perimeter] ?? 0) + 1;
    }
  }

  return getMaxPropVal(solutions);
}

console.time("test");
console.log(intRightTriangles(500));
console.log(intRightTriangles(800));
console.log(intRightTriangles(900));
console.log(intRightTriangles(1000));
console.timeEnd("test");
