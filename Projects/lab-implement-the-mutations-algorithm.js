console.log("MUTATION ALGORITHM" + "\n");

function mutation(array) {
  const string1 = array[0].toLowerCase().split("");
  const string2 = array[1].toLowerCase().split("");
  if (array.length !== 2) {
    console.log("Please input an array with two elements");
    return;
  }

  for (const element of string2) {
    if (!string1.includes(element)) {
      return false;
    }
  }
  return true;
}

console.log(`mutation(["hello", "hey"]): ${mutation(["hello", "hey"])}`);
console.log(`mutation(["hello", "Hello"]): ${mutation(["hello", "Hello"])}`);
console.log(`mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"]): ${mutation(["zyxwvutsrqponmlkjihgfedcba", "qrstu"])}`);
console.log(`mutation(["Mary", "Army"]): ${mutation(["Mary", "Army"])}`);
console.log(`mutation(["Mary", "Aarmy"]): ${mutation(["Mary", "Aarmy"])}`);
console.log(`mutation(["Alien", "line"]): ${mutation(["Alien", "line"])}`);
console.log(`mutation(["floor", "for"]): ${mutation(["floor", "for"])}`);
console.log(`mutation(["hello", "neo"]): ${mutation(["hello", "neo"])}`);
console.log(`mutation(["voodoo", "no"]): ${mutation(["voodoo", "no"])}`);
console.log(`mutation(["ate", "date"]): ${mutation(["ate", "date"])}`);
console.log(`mutation(["Tiger", "Zebra"]): ${mutation(["Tiger", "Zebra"])}`);
console.log(`mutation(["Noel", "Ole"]): ${mutation(["Noel", "Ole"])}`);
