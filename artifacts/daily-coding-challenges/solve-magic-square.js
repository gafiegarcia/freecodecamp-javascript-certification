// this badly needs a review:
// 1. is it correct approach to decide first row as the sum
//    then checking against it? it works, but idk -> yes
//    Every line must equal, so any complete line works as the ruler
// 2. turns out this is not too bad... perhaps stylistic issues
//    like naming (I worked hard on this, but still...)
const GRID_SIZE = 3;

// this throws while isValidMagic square returns boolean even though
// both are "valid/validation". if throwing when something's wrong,
// use "assert" -> "assertNumericSquareGrid"
function validateSquareNumbersGrid(grid) {
  if (
    !Array.isArray(grid) ||
    grid.length !== GRID_SIZE ||
    grid.some(
      (rowArr) =>
        !Array.isArray(rowArr) ||
        rowArr.length !== GRID_SIZE ||
        rowArr.some((n) => typeof n !== "number"),
    )
  )
    throw new Error(
      `Invalid ${GRID_SIZE}x${GRID_SIZE} grid: ${JSON.stringify(grid)}`,
    );
}

function findEmptyCell(grid) {
  // The job of "find the empty cell" shouldn't include checking
  // the whole grid. Move this to top of `solveMagicSquare`
  validateSquareNumbersGrid(grid);
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (grid[row][col] === 0) return [row, col];
    }
  }
  return null;
}

function sumArray(arr) {
  // bad habit here -> passing initialValue is good habit
  // (starting total explicit and safe when the array is empty)
  return arr.reduce((total, n) => total + n);
}

// -> isMagicSquare -> returns boolean
function isValidMagicSquare(grid) {
  // there are many sums in here. suggestions: "target" or "magicSum"
  // let -> const (don't forget to change this again)
  let sum = sumArray(grid[0]);

  // check rows
  for (let row = 1; row < GRID_SIZE; row++) {
    if (sum !== sumArray(grid[row])) return false;
  }

  // check columns
  for (let col = 0; col < GRID_SIZE; col++) {
    const colArr = grid.map((rowArr) => rowArr[col]);
    if (sum !== sumArray(colArr)) return false;
  }

  // check diagonals
  const diagonal1 = grid.map((rowArr, row) => rowArr[row]);
  if (sum !== sumArray(diagonal1)) return false;

  const diagonal2 = grid.map((rowArr, row) => rowArr[GRID_SIZE - 1 - row]);
  if (sum !== sumArray(diagonal2)) return false;

  return true;
}

function solveMagicSquare(grid) {
  // findEmptyCell may return `null`. validate here
  const [row, col] = findEmptyCell(grid);
  // row ? 0 : 1 is too cryptic. give the idea a name:
  // const referenceRow = row === 0 ? 1 : 0; -> grid[referenceRow]
  // also naming -> "target"/"magicSum"
  const sum = sumArray(grid[row ? 0 : 1]);
  // naming: from reader's pov, this value isn't really a "diff". suggestions: "missing" or "candidate"
  const diff = sum - sumArray(grid[row]);

  const testGrid = structuredClone(grid);
  testGrid[row][col] = diff;

  return isValidMagicSquare(testGrid) ? diff : "impossible";
}

console.log(
  solveMagicSquare([
    [2, 7, 6],
    [9, 0, 1],
    [4, 3, 8],
  ]),
);
console.log(
  solveMagicSquare([
    [0, 14, 12],
    [18, 10, 2],
    [8, 6, 16],
  ]),
);
console.log(
  solveMagicSquare([
    [12, 17, 16],
    [19, 0, 10],
    [14, 13, 18],
  ]),
);
console.log(
  solveMagicSquare([
    [15, 35, 31],
    [43, 27, 11],
    [23, 19, 0],
  ]),
);
console.log(
  solveMagicSquare([
    [26, 41, 14],
    [47, 35, 0],
    [32, 29, 44],
  ]),
);

// A thought experiment 🧠 (from Claude)

// The problem only says "sums must match." Classic magic squares also need distinct numbers, with no repeats. Does your solver ever return a number that's already in the grid? What would a grid like that look like? You don't need to change anything; it's just a fun thing to think about.

// I noticed the pattern: when all numbers are sorted, they are apart by the same increment

console.log(
  solveMagicSquare([
    [5, 5, 5],
    [5, 0, 5],
    [5, 5, 5],
  ]),
);

function hasRepeatingNumber(grid) {
  const uniqueNumbers = new Set(grid.flat());
  return uniqueNumbers.size !== grid.length;
  // or GRID_SIZE in this context...perhaps this should run after the "assertNumericSquareGrid
}

console.log(
  hasRepeatingNumber([
    [5, 5, 5],
    [5, 0, 5],
    [5, 5, 5],
  ]),
);
