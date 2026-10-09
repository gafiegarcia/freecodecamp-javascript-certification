function bucketFill(grid, target) {
  const rows = grid.length;
  const cols = grid[0].length;
  const start = grid.flat().join("");
  const goal = target.repeat(rows * cols);

  // Each cell's 4-directional neighbours, as flat indexes (computed once)
  const neighbours = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const list = [];
      if (r > 0) list.push((r - 1) * cols + c);
      if (r < rows - 1) list.push((r + 1) * cols + c);
      if (c > 0) list.push(r * cols + c - 1);
      if (c < cols - 1) list.push(r * cols + c + 1);
      neighbours.push(list);
    }
  }

  // Split a board string into regions: [{ cells, color, borderColors }]
  function getRegions(board) {
    const visited = new Array(board.length).fill(false);
    const regions = [];
    for (let i = 0; i < board.length; i++) {
      if (visited[i]) continue;
      const color = board[i];
      const cells = [];
      const borderColors = new Set();
      const stack = [i];
      visited[i] = true;
      while (stack.length) {
        const cell = stack.pop();
        cells.push(cell);
        for (const n of neighbours[cell]) {
          if (board[n] !== color) borderColors.add(board[n]);
          else if (!visited[n]) {
            visited[n] = true;
            stack.push(n);
          }
        }
      }
      regions.push({ cells, color, borderColors });
    }
    return regions;
  }

  // Breadth-first search over whole-board states: level = number of clicks
  let level = [start];
  const seen = new Set(level);
  for (let clicks = 0; level.length; clicks++) {
    if (seen.has(goal)) return clicks;
    const next = [];
    for (const board of level) {
      for (const { cells, color, borderColors } of getRegions(board)) {
        // Only worth painting a region a neighbour's color (to merge) or the target
        const choices = new Set(borderColors).add(target);
        choices.delete(color);
        for (const newColor of choices) {
          const chars = board.split("");
          for (const cell of cells) chars[cell] = newColor;
          const newBoard = chars.join("");
          if (newBoard === goal) return clicks + 1;
          if (!seen.has(newBoard)) {
            seen.add(newBoard);
            next.push(newBoard);
          }
        }
      }
    }
    level = next;
  }
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
