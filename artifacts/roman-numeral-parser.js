"use strict";

// from fCC's Daily Coding Challenge "Roman Numeral Parser"
// #28 09-07 (September 7th 2026)
// saved mainly because I want to save the whitelist regex...

const ROMAN_VALUES = new Map([
  ["I", 1],
  ["V", 5],
  ["X", 10],
  ["L", 50],
  ["C", 100],
  ["D", 500],
  ["M", 1000],
]);

// of course Claude wrote this line...
const VALID_ROMAN =
  /^M{0,3}(?:CM|CD|D?C{0,3})(?:XC|XL|L?X{0,3})(?:IX|IV|V?I{0,3})$/;

function isValidRoman(numeral) {
  return numeral !== "" && VALID_ROMAN.test(numeral);
}

function parseRomanNumeral(numeral) {
  if (!isValidRoman(numeral))
    throw new Error(`Invalid Roman numeral: "${numeral}"`);

  let total = 0;
  for (let i = 0; i < numeral.length; i++) {
    const left = ROMAN_VALUES.get(numeral[i]);
    const right = ROMAN_VALUES.get(numeral[i + 1]);
    if (left < right) {
      total += right - left;
      i++;
    } else {
      total += left;
    }
  }

  return total;
}

console.log(parseRomanNumeral("III"));
console.log(parseRomanNumeral("IV"));
console.log(parseRomanNumeral("XXVI"));
console.log(parseRomanNumeral("XCIX"));
console.log(parseRomanNumeral("CDLX"));
console.log(parseRomanNumeral("DIV"));
console.log(parseRomanNumeral("MMXXVI"));
