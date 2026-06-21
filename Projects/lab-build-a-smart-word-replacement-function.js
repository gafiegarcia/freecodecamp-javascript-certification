function myReplace(str, word, replacement) {
  return str.replaceAll(word, (w) => {
    return w[0].toUpperCase() === w[0]
      ? replacement[0].toUpperCase() + replacement.slice(1)
      : replacement[0].toLowerCase() + replacement.slice(1);
  });
}

const str1 = "Let us go to the store";
console.log(myReplace(str1, "store", "mall"));
