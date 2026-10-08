const DIRECTIONS = [-1, 0, 1].flatMap((i) => [-1, 0, 1].map((j) => [i, j]));

function bucketFill(grid, targetColor) {
  const targetGridString = grid
    .map((row) => targetColor.repeat(row.length))
    .join(":");
  console.log(targetGridString);
  const colors = new Set(grid.flat().concat(targetColor));
  const seen = new Set();

  const queue = [{ clicks: 0, grid: structuredClone(grid) }];

  while (queue.length > 0) {
    const current = queue.shift();
    const currentGrid = structuredClone(current.grid);

    // if match targetGridString then return current.clicks

    for (let row = 0; row < currentGrid.length; row++) {
      for (let col = 0; col < currentGrid[row].length; col++) {
        for (const color of colors) {
          // TODO: push color clicks to queue
        }
      }
    }

    // add current grid to `seen` after pushing to queue
  }
}

function gridToString(grid) {
  return grid.map((row) => row.join("")).join(":");
}

function floodFill(grid, row, col, fillColor) {
  const currentColor = grid[row][col];
  if (currentColor === fillColor) return; // TODO: check needed return value later

  for (const [rowDir, colDir] of DIRECTIONS) {
    // TODO: fill to four directions
    // only if not out of bounds and color === currentColor
  }
}

function isOutOfBounds(grid, row, col) {
  return row < 0 || col < 0 || row >= grid.length || col >= grid[row].length;
}

console.log(
  bucketFill(
    [
      ["B", "B"],
      ["B", "B"],
    ],
    "R",
  ),
); // 1
console.log(
  bucketFill(
    [
      ["G", "G", "G"],
      ["G", "G", "G"],
      ["G", "G", "G"],
    ],
    "G",
  ),
); // 0
console.log(
  bucketFill(
    [
      ["P", "P", "Y"],
      ["Y", "P", "Y"],
      ["Y", "P", "P"],
    ],
    "O",
  ),
); // 2
console.log(
  bucketFill(
    [
      ["R", "G", "R", "G"],
      ["R", "G", "R", "G"],
      ["B", "B", "B", "B"],
      ["B", "B", "B", "B"],
      ["R", "G", "R", "G"],
    ],
    "Y",
  ),
); // 3
