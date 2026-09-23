console.log("— Depth-First Search Algorithm —\n");

function dfs(graph, root) {
  if (!Array.isArray(graph)) {
    throw new TypeError("`graph` must be an array");
  }

  const n = graph.length;

  if (n < 1) {
    throw new RangeError("`graph` must be a non-empty array");
  }

  if (!Number.isInteger(root)) {
    throw new TypeError("`root` must be an integer");
  }

  if (root < 0 || root >= n) {
    throw new RangeError(
      `\`root\` must be a valid index of \`graph\` (between 0 and ${n - 1}), received ${root}`,
    );
  }

  graph.forEach((row, rowIndex) => {
    if (!Array.isArray(row)) {
      throw new TypeError(
        `row ${rowIndex} is not an array; each row in \`graph\` must be an array`,
      );
    }

    if (row.length !== n) {
      throw new Error(
        `expected an adjacency matrix: \`graph\` has ${n} items, but row ${rowIndex} has ${row.length} items`,
      );
    }
  });

  const stack = [root];
  const visited = new Set();

  while (stack.length > 0) {
    const current = stack.pop();
    if (visited.has(current)) continue;

    visited.add(current);

    for (let node = n - 1; node >= 0; node--) {
      if (graph[current][node] && !visited.has(node)) {
        stack.push(node);
      }
    }
  }

  return [...visited];
}

console.log(
  dfs(
    [
      [0, 1, 1, 0],
      [1, 0, 1, 1],
      [1, 1, 0, 1],
      [0, 1, 1, 0],
    ],
    1,
  ),
);
