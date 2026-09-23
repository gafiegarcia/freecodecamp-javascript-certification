console.log("— Adjacency List to Matrix Converter —\n");

function adjacencyListToMatrix(listObj) {
  const length = Object.keys(listObj).length;
  const matrix = [];

  for (const node in listObj) {
    const row = Array(length).fill(0);

    for (const target of listObj[node]) {
      row[target] = 1;
    }

    matrix.push(row);
  }

  // printing
  for (const row of matrix) {
    console.log(row);
  }

  return matrix;
}

const adjList = {
  0: [1, 2],
  1: [2],
  2: [0, 3],
  3: [2],
};

console.log(adjacencyListToMatrix(adjList));
