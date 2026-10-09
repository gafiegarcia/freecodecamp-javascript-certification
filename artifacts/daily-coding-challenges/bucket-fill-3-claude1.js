function bucketFill(grid, targetColor) {
  const rows = grid.length;
  const cols = grid[0].length;
  const start = grid.flat().join("");
  const goal = targetColor.repeat(rows * cols);
  if (start === goal) return 0;

  const colors = [...new Set(start + targetColor)];
  const seen = new Set([start]);
  let level = [start];

  for (let clicks = 1; level.length > 0; clicks++) {
    const nextLevel = [];

    for (const cells of level) {
      const visited = new Array(cells.length).fill(false);

      for (let i = 0; i < cells.length; i++) {
        if (visited[i]) continue;

        const region = getRegion(cells, rows, cols, i);
        region.forEach((j) => (visited[j] = true));

        for (const color of colors) {
          if (color === cells[i]) continue;

          const painted = [...cells];
          region.forEach((j) => (painted[j] = color));
          const next = painted.join("");

          if (next === goal) return clicks;
          if (seen.has(next)) continue;

          seen.add(next);
          nextLevel.push(next);
        }
      }
    }

    level = nextLevel;
  }
}

function getRegion(cells, rows, cols, start) {
  const color = cells[start];
  const region = new Set([start]);
  const stack = [start];

  while (stack.length > 0) {
    const i = stack.pop();

    for (const next of getNeighbors(i, rows, cols)) {
      if (cells[next] !== color || region.has(next)) continue;
      region.add(next);
      stack.push(next);
    }
  }

  return region;
}

function getNeighbors(i, rows, cols) {
  const row = Math.floor(i / cols);
  const col = i % cols;
  const neighbors = [];

  if (row > 0) neighbors.push(i - cols);
  if (row < rows - 1) neighbors.push(i + cols);
  if (col > 0) neighbors.push(i - 1);
  if (col < cols - 1) neighbors.push(i + 1);

  return neighbors;
}

const tests = [
  [[["B", "B"], ["B", "B"]], "R", 1],
  [[["G", "G", "G"], ["G", "G", "G"], ["G", "G", "G"]], "G", 0],
  [[["P", "P", "Y"], ["Y", "P", "Y"], ["Y", "P", "P"]], "O", 2],
  [[["G", "Y", "C", "C"], ["Y", "Y", "Y", "B"], ["C", "Y", "B", "B"], ["C", "B", "B", "C"]], "R", 4],
  [[["G", "G", "O", "O"], ["G", "Y", "B", "Y"], ["B", "Y", "B", "Y"], ["B", "Y", "B", "Y"], ["G", "G", "G", "G"]], "P", 5],
  [[["R", "G", "R", "G"], ["R", "G", "R", "G"], ["B", "B", "B", "B"], ["B", "B", "B", "B"], ["R", "G", "R", "G"]], "Y", 3],
];
for (const [g, t, want] of tests) {
  const t0 = performance.now();
  const got = bucketFill(g, t);
  console.log(got === want ? "PASS" : "FAIL", got, want, `${(performance.now() - t0).toFixed(1)}ms`);
}
