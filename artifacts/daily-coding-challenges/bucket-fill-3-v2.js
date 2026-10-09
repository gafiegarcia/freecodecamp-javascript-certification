const DIRECTIONS = [-1, 1].flatMap((n) => [
  [0, n],
  [n, 0],
]);

function bucketFill(grid, targetColor) {
  console.time("bucketFill!");

  const targetGridString = grid
    .map((row) => targetColor.repeat(row.length))
    .join(":");
  const initialGridString = gridToString(grid);
  if (initialGridString === targetGridString) {
    console.timeEnd("bucketFill!");
    return 0;
  }

  const colors = new Set(grid.flat().concat(targetColor));
  const seen = new Set();
  seen.add(initialGridString);
  const queue = [{ clicks: 0, grid }];

  while (queue.length > 0) {
    const current = queue.shift();
    const visited = new Set();

    for (let row = 0; row < current.grid.length; row++) {
      for (let col = 0; col < current.grid[row].length; col++) {
        if (visited.has(indicesToString(row, col))) {
          continue;
        }

        const floodFillIndicesStrings = getFloodFillIndicesStrings(
          current.grid,
          row,
          col,
        );
        floodFillIndicesStrings.forEach((indicesStr) =>
          visited.add(indicesStr),
        );

        const currentColor = current.grid[row][col];

        for (const color of colors) {
          if (currentColor === color) continue;

          const indicesToFill = floodFillIndicesStrings
            .values()
            .map(stringToIndices);
          const coloredGrid = current.grid.map((row) => row.slice());
          indicesToFill.forEach(
            ([rowToFill, colToFill]) =>
              (coloredGrid[rowToFill][colToFill] = color),
          );

          const coloredGridString = gridToString(coloredGrid);

          if (coloredGridString === targetGridString) {
            console.timeEnd("bucketFill!");
            return current.clicks + 1;
          }
          if (seen.has(coloredGridString)) {
            continue;
          }

          seen.add(coloredGridString);
          queue.push({ clicks: current.clicks + 1, grid: coloredGrid });
        }
      }
    }
  }
}

function gridToString(grid) {
  return grid.map((row) => row.join("")).join(":");
}

function getFloodFillIndicesStrings(grid, row, col) {
  const currentColor = grid[row][col];
  // inclusive of the current cell
  const floodFillIndicesStrings = new Set([indicesToString(row, col)]);
  const stack = [[row, col]];

  while (stack.length > 0) {
    const [currentRow, currentCol] = stack.pop();

    for (const [rowDir, colDir] of DIRECTIONS) {
      const nextRow = currentRow + rowDir;
      const nextCol = currentCol + colDir;

      if (
        isOutOfBounds(grid, nextRow, nextCol) ||
        grid[nextRow][nextCol] !== currentColor ||
        floodFillIndicesStrings.has(indicesToString(nextRow, nextCol))
      ) {
        continue;
      }

      floodFillIndicesStrings.add(indicesToString(nextRow, nextCol));
      stack.push([nextRow, nextCol]);
    }
  }

  return floodFillIndicesStrings;
}

function isOutOfBounds(grid, row, col) {
  return row < 0 || col < 0 || row >= grid.length || col >= grid[row].length;
}

function indicesToString(row, col) {
  return `${row}:${col}`;
}

function stringToIndices(str) {
  const { row, col } = str.match(/(?<row>\d+):(?<col>\d+)/).groups;
  return [+row, +col];
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
      ["G", "Y", "C", "C"],
      ["Y", "Y", "Y", "B"],
      ["C", "Y", "B", "B"],
      ["C", "B", "B", "C"],
    ],
    "R",
  ),
); // 4
console.log(
  bucketFill(
    [
      ["G", "G", "O", "O"],
      ["G", "Y", "B", "Y"],
      ["B", "Y", "B", "Y"],
      ["B", "Y", "B", "Y"],
      ["G", "G", "G", "G"],
    ],
    "P",
  ),
); // 5
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
