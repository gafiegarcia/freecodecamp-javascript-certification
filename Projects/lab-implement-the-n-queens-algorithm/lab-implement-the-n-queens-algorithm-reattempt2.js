console.log("— Implement the N-Queens Algorithm —\n");

function dfsNQueens(n) {
  if (n < 1) return [];

  const isQueenSafe = (board, row, col) =>
    board.every((c, r) => col !== c && Math.abs(row - r) !== Math.abs(col - c));

  const solutions = [];
  const stack = [[]];

  while (stack.length > 0) {
    const currBoard = stack.pop();
    // length of currBoard is also the index for the next row
    const row = currBoard.length;

    if (row === n) {
      solutions.push(currBoard);
      continue;
    }

    for (let col = n - 1; col >= 0; col--) {
      if (isQueenSafe(currBoard, row, col)) stack.push([...currBoard, col]);
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
