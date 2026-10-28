# Shortest Path Algorithm

spec from the last review of JS cert (basically describes Dijkstra algo):

Shortest Path Algorithm: Computes the shortest path between nodes in a weighted graph and returns both the distances and the paths taken.

- **Adjacency Matrix**: Each value represents the weight (distance) of the edge between two nodes.
- **Missing Edges**: A value of INF (Infinity) means there is no direct edge.
- **Distances**: An array that keeps track of the shortest known distance from the start node to every other node. To begin, every node is assumed to be infinitely far away, and the distance from the start node to itself is always 0.
- **Paths**: A list where each entry is an array of node indices representing the route taken to reach each node.
- **Visited**: An array that tracks which nodes have already been processed so you don't revisit them.
- **Closest Unvisited Node**: The main loop runs once for each node in the graph, selecting the closest unvisited node each time.
- **Edge Relaxation**: For each neighbor with an actual edge that has not been visited yet, check if you can reach it more efficiently through the current node. If the new distance is better than what's already stored, update the distance and the path.
- **Unreachable Nodes**: When no valid node is found, all the remaining nodes are unreachable, so the loop stops early.
- **Optional Target**: The targetNode parameter is optional. When not provided, the function computes shortest paths from startNode to all other nodes in the graph.
