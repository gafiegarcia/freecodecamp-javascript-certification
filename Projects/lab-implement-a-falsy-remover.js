console.log("Falsy Remover" + "\n");

function bouncer(array) {
  const falsyValues = [false, null, 0, "", undefined, NaN];
  const cleanedArray = array.slice();
  // console.log(array.length)

  // almost gave up and asked AI and it gave me a hint: "The problem happens because after a splice, the loop moves forward — but what if the loop moved backward instead?"
  for (let i = array.length - 1; i >= 0 ; i--) {
    if (Boolean(cleanedArray[i]) === false) {
      cleanedArray.splice(i, 1);
    }
  }

  return cleanedArray;
}

console.log(`bouncer([7, "ate", "", false, 9]):`);
console.log(bouncer([7, "ate", "", false, 9]));
console.log();

console.log(`bouncer(["a", "b", "c"]):`);
console.log(bouncer(["a", "b", "c"]));
console.log();

console.log(`bouncer([false, null, 0, NaN, undefined, ""]):`);
console.log(bouncer([false, null, 0, NaN, undefined, ""]));
console.log();

console.log(`bouncer([null, NaN, 1, 2, undefined]):`);
console.log(bouncer([null, NaN, 1, 2, undefined]));
console.log();

console.log(`bouncer([]):`);
console.log(bouncer([]));
console.log();
