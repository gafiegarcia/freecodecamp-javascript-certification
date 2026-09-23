console.log("— Depth-First Search Algorithm —\n");

function dfs(graph, root) {
  const stack = [root];
  const visited = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    const neighbors = [];

    for (const [node, edge] of graph[current].entries()) {
      if (edge && !visited.includes(node)) {
        neighbors.push(node);
      }
    }

    visited.push(...neighbors);
    stack.push(...neighbors.sort((a, b) => b - a));
  }

  return visited;
}

console.log("dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 1):");
console.log(dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 1));
console.log();
console.log("dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 3)")
console.log(dfs([[0, 1, 0, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0]], 3))
console.log()
console.log("dfs([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]], 3)");
console.log(dfs([[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]], 3));
