console.log("Title Case Converter" + "\n");

function titleCase(string) {
  // type check first — building habits...
  if(typeof string !== "string") {
    console.log("Please input a string");
    return;
  }

  let resultArray = [];
  for (let word of string.split(" ")) {
    resultArray.push(word[0].toUpperCase() + word.slice(1).toLowerCase());
  }

  return resultArray.join(" ");
}

// tests
console.log(`titleCase("I like to code"):`);
console.log(titleCase("I like to code"));
console.log();

console.log(`titleCase("javaScript is fun"):`);
console.log(titleCase("javaScript is fun"));
console.log();

console.log(`titleCase("I'm a little tea pot"):`);
console.log(titleCase("I'm a little tea pot"));
console.log();

console.log(`titleCase("I'm a little tea pot"):`);
console.log(titleCase("I'm a little tea pot"));
console.log();

console.log(`titleCase("sHoRt AnD sToUt"):`);
console.log(titleCase("sHoRt AnD sToUt"));
console.log();

console.log(`titleCase("HERE IS MY HANDLE HERE IS MY SPOUT"):`);
console.log(titleCase("HERE IS MY HANDLE HERE IS MY SPOUT"));
console.log();
