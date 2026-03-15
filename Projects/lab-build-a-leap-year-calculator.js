console.log("Leap Year Calculator\n")

function isLeapYear(year) {
  return ((year % 4 == 0 && year % 100 != 0) 
    || year % 400 == 0)
    ? `${year} is a leap year.`
    : `${year} is not a leap year.`; 
}
let year = 8;
let result = isLeapYear(year);
console.log(result)

year = 1900;
result = isLeapYear(year);
console.log(result)

year = 2000;
result = isLeapYear(year);
console.log(result)

year = 2024;
result = isLeapYear(year);
console.log(result)
