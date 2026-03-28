console.log("HTML Entity Converter" + "\n");

function convertHTML(string) {
  const entityPairs = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&apos;",
  }

  const stringArray = string.split("");
  for (const [i, char] of stringArray.entries()) {
    if (Object.hasOwn(entityPairs, char)) {
      stringArray[i] = entityPairs[char];
    }
  }

  return stringArray.join("");
}

// tests
console.log(`convertHTML("Dolce & Gabbana"):`);
console.log(convertHTML("Dolce & Gabbana"));
console.log();

console.log(`convertHTML("Hamburgers < Pizza < Tacos"):`);
console.log(convertHTML("Hamburgers < Pizza < Tacos"));
console.log();

console.log(`convertHTML("Sixty > twelve"):`);
console.log(convertHTML("Sixty > twelve"));
console.log();

console.log(`convertHTML('Stuff in "quotation marks"'):`);
console.log(convertHTML('Stuff in "quotation marks"'));
console.log();

console.log(`convertHTML("Schindler's List"):`);
console.log(convertHTML("Schindler's List"));
console.log();

console.log(`convertHTML("<>"):`);
console.log(convertHTML("<>"));
console.log();

console.log(`convertHTML("abc"):`);
console.log(convertHTML("abc"));
console.log();
