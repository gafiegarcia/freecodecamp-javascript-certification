const graph = [
  [0, 9, 2, 3, Infinity, Infinity, Infinity], // A
  [9, 0, Infinity, Infinity, Infinity, 2, Infinity], // B
  [2, 4, 0, Infinity, Infinity, Infinity, Infinity], // C
  [3, Infinity, Infinity, 0, 1, 4, Infinity], // D
  [Infinity, 1, Infinity, 1, 0, Infinity, Infinity], // E
  [Infinity, 2, Infinity, 4, Infinity, 0, Infinity], // F
  [1, Infinity, Infinity, Infinity, Infinity, Infinity, 0], // G
];

// Returns shortest distances and paths from `start`.
// Among equally short paths, the one with the fewest hops wins:
// - updateDistancesAndPaths replaces a path on a tie if the new one has fewer hops
// - getClosestUnvisitedNode locks the fewer-hop node first on a distance tie,
//   so a zero-weight edge can't lock a longer path before a shorter one arrives
// Assumes no negative weights.
function dijkstra(graph, start, targetNode = null) {
  const n = graph.length;

  function isInvalidNodeIndex(number) {
    return !Number.isInteger(number) || number < 0 || number >= n;
  }
  function getNodeIndexError(paramName, argument) {
    return new RangeError(
      `${paramName} must be a valid node index between 0 and ${n - 1} inclusive, got ${argument} instead`,
    );
  }

  if (isInvalidNodeIndex(start)) {
    throw getNodeIndexError("start", start);
  }
  if (targetNode !== null && isInvalidNodeIndex(targetNode)) {
    throw getNodeIndexError("targetNode", targetNode);
  }

  const visited = new Set();
  const distances = new Array(n).fill(Infinity);
  const paths = new Array(n).fill(null);
  distances[start] = 0;
  paths[start] = [start];

  // only to be called on node which distance (and path) is already fixed/locked
  // -> exactly when it gets visited
  function updateDistancesAndPaths() {
    const distanceTraveled = distances[current];
    const currentPath = paths[current];
    const edges = graph[current];
    for (let i = 0; i < n; i++) {
      if (visited.has(i)) continue;

      const currentBestDistance = distances[i];
      const hopDistance = edges[i];
      const newDistance = distanceTraveled + hopDistance;
      const existingPathLength = paths[i]?.length;
      const newPathLength = currentPath.length + 1;

      // on a distance tie, prefer the path with fewer hops
      if (
        newDistance < currentBestDistance ||
        (newDistance !== Infinity &&
          newDistance === currentBestDistance &&
          newPathLength < existingPathLength)
      ) {
        const newPath = [...currentPath, i];
        distances[i] = newDistance;
        paths[i] = newPath;
      }
    }
  }

  function getClosestUnvisitedNode() {
    let closestUnvisitedNode;
    let closestHops;
    for (let i = 0; i < n; i++) {
      if (visited.has(i) || distances[i] === Infinity) continue;
      if (
        distances[i] < (distances[closestUnvisitedNode] ?? Infinity) ||
        (distances[i] === distances[closestUnvisitedNode] &&
          paths[i].length < closestHops)
      ) {
        closestUnvisitedNode = i;
        closestHops = paths[i].length;
      }
    }

    return closestUnvisitedNode;
  }

  let current = start;
  while (current !== undefined) {
    // distance and path is locked, so exit early
    if (current === targetNode) break;
    // mark visited
    visited.add(current);

    // scouting neighbors
    updateDistancesAndPaths();
    // determine which one to visit next (node with "locked"/"fixed" distance & path)
    // the unvisited node with the smallest distance out of all unvisited nodes is locked:
    // no other route can make it cheaper (another route may tie, but never beat it)
    current = getClosestUnvisitedNode();
  }

  if (targetNode !== null) {
    return { distance: distances[targetNode], path: paths[targetNode] };
  }
  return { distances, paths };
}

console.log(dijkstra(graph, 0));
console.log(dijkstra(graph, 0, 5));
console.log(dijkstra(graph, 0, 0));
console.log(dijkstra(graph, 0, 6));
// console.log(dijkstra(graph, 0, 7)); // should throw
