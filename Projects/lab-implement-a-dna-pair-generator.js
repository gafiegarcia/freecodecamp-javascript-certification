console.log("DNA Pair Generator" + "\n");

function pairElement(dnaStrand) {
  function createPair(nBase) {
    switch (nBase) {
      case "A":
        return ["A", "T"];
      case "T":
        return ["T", "A"];
      case "C":
        return ["C", "G"];
      case "G":
        return ["G", "C"];
      default:
        console.log("Invalid nucleotide bases");
        return;
    }
  }

  const result = [];
  for (const nBase of dnaStrand) {
    result.push(createPair(nBase));
  }

  return result;
}

// tests
console.log(`pairElement("ATCGA"):`);
console.log(pairElement("ATCGA"));
console.log();

console.log(`pairElement("TTGAG"):`);
console.log(pairElement("TTGAG"));
console.log();

console.log(`pairElement("CTCTA"):`);
console.log(pairElement("CTCTA"));
console.log();

// pre-submit contemplation

/*
The most elegant way to finish this:
  1. create an object of the pre-determined pairs
  2. eliminate the nested function
  3. construct the nested array directly in the .push() argument

function pairElement(dnaStrand) {
  const dnaPairs = { "A": "T", "T": "A", "C": "G", "G": "C" }
  const result = [];
  for (const nBase of dnaStrand) {
    result.push([nBase, dnaPairs[nBase]]);
  }

  return result;
}
*/
