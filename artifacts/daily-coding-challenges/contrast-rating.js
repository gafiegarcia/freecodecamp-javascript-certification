// Ordered from strictest to loosest
// getContrastRating returns the first match from `WCAG_RATINGS`.
const WCAG_RATINGS = [
  { level: "AAA", normal: 7, large: 4.5 },
  { level: "AA", normal: 4.5, large: 3 },
];

// Gamma correction step of the WCAG relative luminance formula
const linearizeChannel = (channel) =>
  channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

// WCAG relative luminance formula
const getLuminanceFromRGB = (rgb) => {
  const normalized = rgb.map((channel) => channel / 255);
  const [linearizedR, linearizedG, linearizedB] =
    normalized.map(linearizeChannel);
  return 0.2126 * linearizedR + 0.7152 * linearizedG + 0.0722 * linearizedB;
};

const getContrastRatio = (l1, l2) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

function getContrastRating(rgb1, rgb2, isLargeText) {
  const l1 = getLuminanceFromRGB(rgb1);
  const l2 = getLuminanceFromRGB(rgb2);
  const contrastRatio = getContrastRatio(l1, l2);
  const size = isLargeText ? "large" : "normal";

  const bestRating = WCAG_RATINGS.find(
    (rating) => contrastRatio >= rating[size],
  );

  return bestRating?.level ?? "Fail";
}

console.log(getContrastRating([255, 255, 255], [0, 0, 0], false));
console.log(getContrastRating([215, 188, 188], [55, 55, 55], false));
console.log(getContrastRating([143, 144, 210], [46, 47, 61], false));
console.log(getContrastRating([167, 167, 210], [53, 10, 53], true));
console.log(getContrastRating([135, 147, 155], [60, 70, 90], true));
console.log(getContrastRating([125, 210, 195], [105, 130, 90], true));
