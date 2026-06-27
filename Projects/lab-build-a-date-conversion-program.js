console.log("— Date Conversion Program —\n");

const currentDate = new Date();
const currentDateFormat = `Current Date and Time: ${currentDate}`;

console.log(currentDateFormat);
console.log();

function formatDateMMDDYYYY(date) {
  return `Formatted Date (MM/DD/YYYY): ${date.toLocaleDateString("en-US")}`
}

console.log(formatDateMMDDYYYY(currentDate));
console.log();

function formatDateLong(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  const longDate = date.toLocaleDateString("en-US", options);
  return `Formatted Date (Month Day, Year): ${longDate}`;
}

console.log(formatDateLong(currentDate));