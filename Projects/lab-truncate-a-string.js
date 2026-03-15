** start of script.js **

function truncateString(string, length) {
  return string.slice(0, length) + (string.length > length ? "..." : "");
}

console.log(truncateString("Implement", 100));
console.log(truncateString("Implement", 4));
console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8));


** end of script.js **

