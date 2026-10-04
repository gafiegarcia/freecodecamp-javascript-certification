function findSignal(grid) {
  const towers = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const distance = grid[row][col];
      if (distance !== 0) {
        towers.push({ row, col, distance });
      }
    }
  }

  const isValidCandidate = ([row, col]) =>
    row >= 0 &&
    col >= 0 &&
    row < grid.length &&
    col < grid[row].length &&
    grid[row][col] === 0;

  const candidatesPerTower = towers.map((tower) => {
    const offsets = [-tower.distance, 0, tower.distance];
    return offsets
      .flatMap((rowOffset) =>
        offsets.map((colOffset) => [
          tower.row + rowOffset,
          tower.col + colOffset,
        ]),
      )
      .filter(isValidCandidate);
  });

  const isSameCell = ([r1, c1], [r2, c2]) => r1 === r2 && c1 === c2;

  const phoneCell = candidatesPerTower[0].find((candidate) =>
    candidatesPerTower
      .slice(1)
      .every((otherCandidates) =>
        otherCandidates.some((otherCandidate) =>
          isSameCell(candidate, otherCandidate),
        ),
      ),
  );

  return phoneCell;
}

console.log(
  findSignal([
    [0, 2, 0],
    [1, 0, 0],
    [0, 0, 1],
  ]),
); // [2, 1]
console.log(
  findSignal([
    [0, 0, 2, 0],
    [0, 0, 0, 0],
    [2, 0, 0, 0],
    [0, 0, 0, 1],
  ]),
); // [2, 2]
// console.log(
//   findSignal([
//     [3, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0],
//     [0, 2, 0, 0, 0, 2],
//   ]),
// ); // [3, 3]
