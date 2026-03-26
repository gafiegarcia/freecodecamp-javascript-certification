console.log("String Repeating Function" + "\n");

function repeatStringNumTimes(string, number) {
  let result = "";
  for (let i = 0; i < number; i++) {
    result += string;
  }
  return result;
}

console.log(`repeatStringNumTimes("*", 3): `);
console.log(repeatStringNumTimes("*", 3));

console.log(`repeatStringNumTimes("abc", 3): `);
console.log(repeatStringNumTimes("abc", 3));

console.log(`repeatStringNumTimes("abc", 4): `);
console.log(repeatStringNumTimes("abc", 4));

console.log(`repeatStringNumTimes("abc", 1): `);
console.log(repeatStringNumTimes("abc", 1));

console.log(`repeatStringNumTimes("*", 8): `);
console.log(repeatStringNumTimes("*", 8));

console.log(`repeatStringNumTimes("abc", -2): `);
console.log(repeatStringNumTimes("abc", -2));

console.log(`repeatStringNumTimes("abc", 0): `);
console.log(repeatStringNumTimes("abc", 0));
