console.log("Missing Letter Detector" + "\n");

function fearNotLetter(string) {
  // Incorrect input handling
  if (typeof string !== "string") {
    console.log("Please input a string with at least two letters in order.");
    return;
  }
  for (const char of string.toLowerCase()) {
    if (char < "a" || char > "z") {
      console.log("Only letters are accepted.");
      return;
    }
  }
  if (string.trim().length < 2) {
    console.log("Please input at least two letters in order.");
    return;
  }

  // The tests generously assume the input characters are always in order; I'll try to go beyond and use .sort() and complimenting methods to sort the characters in the string, ensuring the first and the last characters of the data to be processed in the loop are the start and the end, respectively, of the letters range
  const sortedString = string.toLowerCase().split("").toSorted().join("");
  console.log(`sortedString: ${sortedString}`);

  const rangeStartCode = sortedString.charCodeAt(0);
  const rangeEndCode = sortedString.charCodeAt(sortedString.length - 1);
  // console.log(`rangeStartCode: ${rangeStartCode}`)
  // console.log(`rangeEndCode: ${rangeEndCode}`)

  let result = "";
  for (let i = rangeStartCode + 1; i < rangeEndCode; i++) {
    if (!sortedString.includes(String.fromCharCode(i))) {
      result += String.fromCharCode(i);
    }
  }
  // at this point, I knew that the 6th test "fearNotLetter("abcdefghijklmnopqrstuvwxyz") should return undefined" expects students to assign the missing character value directly to the return result, because it's assuming only one character is missing; which is fair, as it's the requirements of the program, but... I just don't like it if the program can't handle more than one missing letters so...
  return result === "" ? undefined : result;
}

console.log(fearNotLetter("eCFda"));
console.log(fearNotLetter("abce"));
console.log(fearNotLetter("abcdefghjklmno"))
console.log(fearNotLetter("stvwx"))
console.log(fearNotLetter("bcdf"))
console.log(fearNotLetter("abcdefghijklmnopqrstuvwxyz"));
