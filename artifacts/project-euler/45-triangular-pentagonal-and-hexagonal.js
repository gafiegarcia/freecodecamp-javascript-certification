// Triangle
// Tn=n(n+1)/2 => t = (n**2 + n) / 2
// 1, 3, 6, 10, 15, ...
//
// Pentagonal
// Pn=n(3n−1)/2 => p = (3 * n**2 - n) / 2
// 1, 5, 12, 22, 35, ...
//
// Hexagonal
// Hn=n(2n−1) => h = (2 * n**2 - n)
// 1, 6, 15, 28, 45, ...
//
// T285 = P165 = H143 = 40755.
//
// working out the diffs
// it's known that starting from +2 on n=1, triangle numbers growth grows by +1 (+2, +3, +4, and so on)
// d = (n^2 +n) / 2 - ((n-1)^2 +n -1) /2
// 2d = n^2 + n - (n^2 -2n +1 +n -1)
// 2d = 2n => but it's counting n against n-1, so for n+1 against n it's 2n + 1? let's find out
// -d = (n^2 +n) / 2 - ((n+1)^2 +n +1) /2
// -2d = n^2 + n - (n^2 + 2n + 1 + n + 1)
// 2d = n^2 + 3n + 2 - n^2 - n
// 2d = 2n +2
// d = n + 1 => for next diff a.k.a (n+1) against (n)
// nvm
//
// working out the reverse
//
// #Triangle
// t = (n^2 + n) / 2
// 2t = n^2 + n
// n^2 + n -2t = 0
// quadratic => a = 1, b = 1, c = -2t
// n = (-b ± √(b^2 - 4ac)) / 2a
// n = (-1 ± √(1 + 8t)) / 2 => n can't be negative, the square block grows as t grows, so the minus half is ignored
//
// same process for the others
//
// #Pentagonal
// 2p = (3 * n**2 - n)
// 3n^2 -n - 2p = 0 => a = 3, b = -1, c = -2p
// quadratic formula => n = (1 + √(1 + 24p)) / 6
//
// #Hexagonal
// 2n^2 -n -h = 0 => a = 2, b = -1, c = -h
// qf => n = (1 + √(1 + 8h)) / 4
const toTriangle = (n) => (n ** 2 + n) / 2;
const toPentagonal = (n) => (3 * n ** 2 - n) / 2;
const toHexagonal = (n) => 2 * n ** 2 - n;
const getTriangleN = (n) => (-1 + Math.sqrt(1 + 8 * n)) / 2;
const getPentagonalN = (n) => (1 + Math.sqrt(1 + 24 * n)) / 6;
const getHexagonalN = (n) => (1 + Math.sqrt(1 + 8 * n)) / 4;

// for (let i = 100; i < 200; i++) {
//   console.log(toPentagonal(i) - toTriangle(i));
// }
// proven that the trend is stable with growth of H > P > T

function triPentaHexa(n) {
  // every hexagonal number is a triangle number
  // hexa = 1 6 15 28 45
  // triangle = 1✅ 3 6✅ 10 15✅ 21 28✅ 36 45✅
  // so only need to check for pentagonal
  // Math.ceil because floor and round will bring it back to the previous solution, 40755
  for (let h = Math.ceil(getHexagonalN(n)); ; h++) {
    const hNum = toHexagonal(h);
    if (Number.isInteger(getPentagonalN(hNum))) return hNum;
  }
}

console.time("triPentaHexa single log");
console.log(triPentaHexa(40756));
console.timeEnd("triPentaHexa single log");
