const toPentagon = (n) => (3 * n ** 2 - n) / 2;
const pentagonToN = (pentagonNum) => (1 + Math.sqrt(1 + 24 * pentagonNum)) / 6;
const isPentagon = (num) => Number.isInteger(pentagonToN(num));
// Find the pair of pentagonal numbers, Pj and Pk,
// for which their sum and difference are pentagonal and
// D = |Pk − Pj| is minimized; what is the value of D?
function pentagonNumbers() {
  for (let k = 2; ; k++) {
    const pk = toPentagon(k);
    for (let j = 1; j < k; j++) {
      const pj = toPentagon(j);
      if (isPentagon(pk + pj) && isPentagon(pk - pj)) {
        return pk - pj;
      }
    }
  }
}

console.time("pentagonNumbers single call");
console.log(pentagonNumbers());
console.timeEnd("pentagonNumbers single call");

// p = n(3n-1)/2
// 2p = 3n^2 - n
// 3n^2 - n - 2p = 0 => quadratic formula!
// n = (-b ± √(b² - 4ac)) / (2a)
// which in this pentagon numbers case:
// n = (1 ± √(1 + 24p)) / 6 => we got the quadratic formula for Pn -> n!
// since p is positive, throw the minus half of the equation so it becomes:
// n = (1 + √(1 + 24p)) / 6
//
// 4 7 10 13 16 19 22 25 28 => Px = Px-1 + (Px-1 - Px-2 + 3)
//
