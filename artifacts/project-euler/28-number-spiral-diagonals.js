"use strict";
// ok I notice the pattern!
//
//  1x1 : 1
//  3x3 : top right is 3^2 = 9. then each corner is 9 - 2, 9 - 2(2), 9 - 2(3)
//  5x5 : top right is 5^2 = 25. other corners are 25 - 4(1), 25 - 4(2), 25 - 4(3)
//
//  now figuring out the 2 and the 4.
//  I think because in a 5x5 grid, the range between
//  first item in a row/col and the last item is always 4. so N - 1

const spiralGrid5 = [
  [21, 22, 23, 24, 25],
  [20, 7, 8, 9, 10],
  [19, 6, 1, 2, 11],
  [18, 5, 4, 3, 12],
  [17, 16, 15, 14, 13],
];

function spiralDiagonals(n) {
  const center = 1;
  const sumDiagonals = (n) =>
    [0, 1, 2, 3].reduce(
      (sum, multiplier) => sum + (n ** 2 - (n - 1) * multiplier),
      0,
    );

  let total = center;
  for (let i = 3; i <= n; i += 2) {
    total += sumDiagonals(i);
  }

  return total;
}

console.log(spiralDiagonals(5) === 101);
console.log(spiralDiagonals(101) === 692101);
console.log(spiralDiagonals(303) === 18591725);
console.log(spiralDiagonals(505) === 85986601);
console.log(spiralDiagonals(1001) === 669171001);
