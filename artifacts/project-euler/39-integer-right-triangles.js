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
  return maxProp;
};

function intRightTriangles(n) {
  const solutions = {};
  const seenPair = {};
  for (let a = 3; 2 * a ** 2 < n * n; a++) {
    for (let b = a + 1; a ** 2 + b ** 2 <= n * n; b++) {
      if (seenPair[a]?.includes(b)) continue;
      const c = getLongestEdge(a, b);
      if (!Number.isInteger(c)) continue;

      let [x, y, z] = [a, b, c];
      while (x + y + z <= n) {
        if (seenPair[x]) {
          seenPair[x].push(y);
        } else {
          seenPair[x] = [y];
        }
        const perimeter = x + y + z;
        solutions[perimeter] = (solutions[perimeter] ?? 0) + 1;
        x += x;
        y += y;
        z += z;
      }
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
