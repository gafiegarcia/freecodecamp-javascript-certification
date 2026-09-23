// reattempt, trying to follow Claude's textbook DFS example's logic, pushing a node after it's pop (when visited, not when "reachable", from memory + using Set for `visited`
console.log("— Depth-First Search Algorithm —\n");

function dfs(graph, root) {
  const stack = [root];
  const visited = new Set();

  while (stack.length > 0) {
    const current = stack.pop();
    visited.add(current);

    if (graph[current].length !== graph.length) {
      throw new Error(
        `Malformed input: graph has ${graph.length} items, but row ${current} has ${graph[current].length} items`,
      );
    }

    for (let node = graph.length - 1; node >= 0; node--) {
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
      [0, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
    ],
    1,
  ),
);
