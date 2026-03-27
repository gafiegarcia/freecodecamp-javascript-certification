console.log("Pyramid Generator" + "\n");

function pyramid(pattern, rows, bool) {
  let result = "\n";
  if (bool) {
    for (let i = rows; i >= 1; i--) {
      result += " ".repeat(rows - i) + pattern.repeat(2 * (i - 1) + 1) + "\n";
    }
  }
  if (!bool) {
    for (let i = 1; i <= rows; i++) {
      result += " ".repeat(rows - i) + pattern.repeat(2 * (i - 1) + 1) + "\n";
    }
  }
  return result;
}

console.log(`pyramid("o", 4, false):`);
console.log(pyramid("o", 4, false));

console.log(`pyramid("p", 5, true):`);
console.log(pyramid("p", 5, true));
