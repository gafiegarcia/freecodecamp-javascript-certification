console.log("— Pig Latin Translator —\n");

const str1 = "california";
const str2 = "algorithm";
const str3 = "rhythm";

function translatePigLatin(str) {
  return vowelRule(str) ?? consonantRule(str);
}

function consonantRule(str) {
  const regex = /(?<cc>^(?:(?![aiueo])[a-z])+).*/i;
  const length = str.match(regex)?.groups.cc.length;

  if (length) {
    return str.replace(regex, str + "$<cc>ay").slice(length);
  }
}

function vowelRule(str) {
  const regex = /^[aiueo]/i;

  if (regex.test(str)) {
    return str + "way";
  }
}

console.log(str1 + " = " + translatePigLatin(str1));
console.log(str2 + " = " + translatePigLatin(str2));
console.log(str3 + " = " + translatePigLatin(str3));

// GPT 5.5 ultimate elegant solution

/*

function translatePigLatin(str) {
  const firstVowelIndex = str.search(/[aeiou]/i);

  // if string starts with vowel
  if (firstVowelIndex === 0) {
    return str + "way";
  }

  // if no vowel is found
  if (firstVowelIndex === -1) {
    return str + "ay";
  }

  // only after both cases don't match will the full consonant rule gets applied here
  const consonantCluster = str.slice(0, firstVowelIndex);
  const restOfWord = str.slice(firstVowelIndex);

  return restOfWord + consonantCluster + "ay";
}

*/

// the good thing about that approach is that it really translates the user story word for word
// damn AI

// one of the key differences is the use firstVowelIndex.
// remember bro that .search() exists.
// always remember to search exactly what I need instead of thinking:
//  "ouch, finding the index of the match requires digging to the match result array,
//  which may cause error if match returns null, blablabla"
// while a method on string to only find index exists 🗿. just search first.

// key learning
// 1. I was using almost-unreadable, too-complex regex to achieve the task
// 2. relying on simple slices instead of overly-engineered regex (captures and all) makes the intent explicit, and the code more readable
