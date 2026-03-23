console.log("FACTORIAL CALCULATOR" + "\n");

let num = 4;

function factorialCalculator(number) {
  if (number > 18) {
    console.log("The input value should be between 1 and 18");
    return;
  } else {
    let result = 1;
    for (let i = 2; i <= number; i++) {
      result = result * i;
    }
    return result;
  }
}

let factorial = factorialCalculator(num);
let resultMsg = `Factorial of ${num} is ${factorial}`;
console.log(resultMsg);

num = 5;
factorial = factorialCalculator(num);
resultMsg = `Factorial of ${num} is ${factorial}`;
console.log(resultMsg);

num = 7;
factorial = factorialCalculator(num);
resultMsg = `Factorial of ${num} is ${factorial}`;
console.log(resultMsg);
