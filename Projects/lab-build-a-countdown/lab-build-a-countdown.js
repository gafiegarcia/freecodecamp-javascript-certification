function countdown(n) {
  if (n < 1) {
    return [];
  }

  // solution 1
  // const countArray = countdown(n-1);
  // countArray.unshift(n);
  // return countArray;

  return [n, ...countdown(n - 1)];
}

console.log(countdown(5));

// review

// a clever pattern by gippidy5.6:

/*
function countdown(n, result = []) {
  if (n < 1) {
    return result;
  }

  result.push(n);
  return countdown(n - 1, result);
}
*/

// there, the intent is more explicit and operation goes logically...
// counting down...
