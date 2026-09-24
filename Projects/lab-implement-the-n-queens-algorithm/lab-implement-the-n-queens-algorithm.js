console.log("— Implement the N-Queens Algorithm —\n");

function dfsNQueens(n) {
  if (n < 1) return [];

  const isQueenSafe = (current, row, col) => {
    return current.every(
      (c, r) => col !== c && Math.abs(row - r) !== Math.abs(col - c),
    );
  };

  const solutions = [];

  for (let i = 0; i < n; i++) {
    const stack = [[i]];

    while (stack.length > 0) {
      const current = stack.pop();
      const row = current.length;

      if (row === n) {
        solutions.push(current);
      } else {
        for (let j = n - 1; j >= 0; j--) {
          if (isQueenSafe(current, row, j)) {
            const board = [...current, j];
            stack.push(board);
          }
        }
      }
    }
  }

  return solutions;
}

console.log(dfsNQueens(6));

function displayBoard(solutions, i) {
  solutions[i].forEach((col) => {
    const rowDisplay = Array(solutions[i].length).fill("•");
    rowDisplay[col] = "Q";
    console.log(rowDisplay.join(" "));
  });
}

displayBoard(dfsNQueens(5), 4);
