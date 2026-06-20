function spinalCase(str) {
  const nonAlphabetic = /[^a-z]/gi;
  const innerCapital = /(?<!(?:^|-))[A-Z]/g;

  return str
    .replace(nonAlphabetic, "-")
    .replace(innerCapital, (m) => "-" + m)
    .toLowerCase();
}

console.log(spinalCase("This Is Spinal Tap"));
console.log(spinalCase("ProductLanding page"));

// GPT 5.5 ultimate solution

/*
  str
  .replace(/([a-z])([A-Z])/g, "$1-$2")  // 1. handle camelCase boundaries first: "tL"
  .replace(/[\s_]+/g, "-")              // 2. intentional removal of only whitespaces and underscores
  .toLowerCase();
*/

// many edge cases are outside the scope, so I guess my and gpt's solution already satisfied the requirements of converting "common" word-boundary formats (camelCase, space, underscore). some of those out of scope things:
// 1. "XMLHttpRequest"
// 2. "version2Update"
