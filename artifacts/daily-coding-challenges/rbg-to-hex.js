function parseRgb(str) {
  const trimmedStr = str.trim();
  const rgbSyntaxRegex =
    /^rgb\(\s*(?<r>\d{1,3})\s*(?<sep1>,|\s)\s*(?<g>\d{1,3})\s*(?<sep2>,|\s)\s*(?<b>\d{1,3})\s*\)$/i;
  const syntaxMatch = trimmedStr.match(rgbSyntaxRegex);

  if (!syntaxMatch) return null;

  const separator1 = syntaxMatch.groups.sep1;
  const separator2 = syntaxMatch.groups.sep2;

  if ((separator1 === ",") !== (separator2 === ",")) return null;

  // leading zero is allowed, like "00"
  const values = [
    syntaxMatch.groups.r,
    syntaxMatch.groups.g,
    syntaxMatch.groups.b,
  ].map(Number);

  const isOutOfRange = (n) => n > 255;
  if (values.some(isOutOfRange)) return null;

  return values;
}

function rgbToHex(rgb) {
  const values = parseRgb(rgb);
  if (!values) return `Invalid rgb input: ${rgb}`;
  const hexes = values.map((n) => n.toString(16).padStart(2, "0"));
  const hex = "#" + hexes.join("");
  return hex;
}

console.log(rgbToHex("rgb(170, 11,111)"));
console.log(rgbToHex("rgb(1,11,111)"));
console.log(
  rgbToHex(
    `rgb(1 11
  111)   `,
  ),
);
console.log(rgbToHex("rgb(1, 11 111)"));
console.log(rgbToHex("rgb(1 23)"));
// console.log(rgbToHex("rgb(111)"));
// console.log(rgbToHex("rgb(11 1)"));
