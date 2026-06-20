const regexPattern = document.getElementById("pattern");
const stringToTest = document.getElementById("test-string");
const testButton = document.getElementById("test-btn");
const testResult = document.getElementById("result");
const caseInsensitiveFlag = document.getElementById("i");
const globalFlag = document.getElementById("g");

function getFlags() {
  const isI = caseInsensitiveFlag.checked;
  const isG = globalFlag.checked;
  const iString = isI ? "i" : "";
  const gString = isG ? "g" : "";

  return iString + gString;
}

function testRegex() {
  const regex = new RegExp(regexPattern.value, getFlags());
  const string = stringToTest.textContent;
  // will just use pushes from replace() callback
  const matches = [];
  const getHighlight = (str) => `<span class="highlight">${str}</span>`;

  // push matches & replace test string with highlights
  stringToTest.innerHTML = string.replace(regex, (match) => {
    matches.push(match);
    return getHighlight(match);
  });

  // print result
  testResult.textContent = matches.length ? matches.join(", ") : "no match";
}

testButton.addEventListener("click", () => {
  testRegex();
});
