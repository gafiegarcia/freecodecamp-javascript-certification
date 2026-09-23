// example of recursive DFS from Claude
function dfs(graph, current, visited = []) {
  visited.push(current);
  for (let node = 0; node < graph[current].length; node++) {
    if (graph[current][node] && !visited.includes(node)) {
      dfs(graph, node, visited);
    }
  }
  return visited;
}
