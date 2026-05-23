console.log("— Proofreading Tool —\n")
// I'm just gonna assume valid input for this project


function isPalindrome(word) {
  const inverted = word.split("").reverse().join("");

  return word.toLowerCase() === inverted.toLowerCase();
}

console.log(`isPalindrome("williw"):`);
console.log(isPalindrome("williw"));


function findPalindromeBreaks(words) {
  const result = [];

  for (let i = 0; i < words.length; i++) {
    if (!isPalindrome(words[i])) result.push(i);
  }

  return result;
}

console.log();
console.log(`findPalindromeBreaks(["a", "this", "yarray", "racecar", "this", "level", "hello"]):`);
console.log(findPalindromeBreaks(["a", "this", "yarray", "racecar", "this", "level", "hello"]))


function findRepeatedPhrases(words, phraseLength) {
  const phrases = {};

  for (let i = 0; i + (phraseLength - 1) < words.length; i++) {
    phrases[i] = (words.slice(i, i + phraseLength));
  }
  
  const result = [];

  for (let i = 0; i < words.length - phraseLength; i++) {
    for (let j = i + phraseLength; j <= words.length - phraseLength; j ++) {
      if (phrases[i].join("") === phrases[j].join("")) {
        if (!result.includes(i)) result.push(i);
        if (!result.includes(j)) result.push(j);
      }
    }
  }

  return result;
}

// const repeatedPhrases = ["a", "cat", "a", "cat", "okay", "a", "this", "sucks", "a", "cat"];
const repeatedPhrases = ["wow", "that's", "so", "cool", "so", "cool"];
console.log();
console.log(`repeatedPhrases: ${repeatedPhrases}\n`);
console.log(`findRepeatedPhrases(repeatedPhrases, 2):`);
console.log(findRepeatedPhrases(repeatedPhrases, 2));


function analyzeTexts(texts, phraseLength) {
  const result = [];

  for (const words of texts) {
    result.push(
      {
        repeatedPhrases: findRepeatedPhrases(words, phraseLength),
        palindromeBreaks: findPalindromeBreaks(words),
      }
    )
  }

  return result;
}

const texts = [
  ["array", "of", "words", "is", "painful"],
  ["especially", "when", "words", "is", "an", "array", "too"],
  ["time", "for", "some", "palindromes", "lol"],
  ["it's", "noon", "already"],
  ["wow", "that's", "so", "cool", "so", "cool"],
  ["refer", "to", "me", "as", "madam", "javaskrttt"],
];
console.log();
console.log(`analyzeTexts(texts, 2):`);
console.log(analyzeTexts(texts, 2));


// this code doesn't cover mathing sequences with
// overlapping indices, yet it passed.
// GH Issue submitted at https://github.com/freeCodeCamp/freeCodeCamp/issues/67545

// Claude Review

/*

1. [critical] `let j = i + phraseLength;` -> `let j = i + 1` to prevent sequences with overlapping indices from being skipped

2. `j ++` -> `j++` a typo (but I wonder why this is fine both in the fcc test and with `node`; or in js generally). 
  answer: js doesn't care, as `++` is one entity and leading whitespace is okay; trailing whitespace has some issues with auto semicolon insertion thing but I don't understand exactly why

3. dropping the `phrases` temp var and call `.slice()` directly within the main for loop. my decision of using `phrases` is only because I was racking up my brain and needed something to look at the console as for how the slices would look like, not because it's how the function end shape should be

Claude elegant solution: ✨ inverted index pattern ✨

function findRepeatedPhrases(words, phraseLength) {
  if (phraseLength >= words.length) return [];

  const groups = {};
  for (let i = 0; i <= words.length - phraseLength; i++) {
    const key = words.slice(i, i + phraseLength).join();
    if (!groups[key]) groups[key] = [];
    groups[key].push(i);
  }

  const result = [];
  for (const indices of Object.values(groups)) {
    if (indices.length > 1) result.push(...indices);
  }
  return result;
}

- the chunks become the keys, the indices become the value. common pattern in:
  - ✅ Search engines: word → list of documents containing it (literally called an "inverted index").
  - Anagram detection: sorted-letters → list of words with those letters. "act", "cat", "tac" all map to "act".
  - Finding duplicates in any dataset: identity → list of records.
  - Counting frequencies: value → count (a degenerate case where you only care about .length of each group).

4. [critical] `.join("")` correctness bug: `["ab", "c"]` and `["a", "bc"]` would match.
either use other chars (e.g., `.join("|")` or `.join("\0")`) OR what I like to do: plain `.join()` (which I just learned equals to `.toString()`)

5. Result ordering
not important for this test, but I guess there are more cases where an output of indices is more desirable if sorted. use `return result.sort((a, b) => a - b)` or `.toSorted(<fn>)`

no use of `Set` since it hasn't been taught and I know that it'd be taught later on, so gaman shite kudasai

*/