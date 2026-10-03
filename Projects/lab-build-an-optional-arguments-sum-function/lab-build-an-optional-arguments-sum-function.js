function isValidNumber(n) {
  return typeof n === "number" && !Number.isNaN(n);
}

function addTogether(...args) {
  const numbers = args.slice(0, 2);

  if (
    numbers.length === 0 ||
    !numbers.every(isValidNumber)
  )
    return undefined;

  const a = numbers[0];
  const addToA = (n) => isValidNumber(n) ? a + n : undefined;

  if (numbers.length === 1) return addToA;
  return addToA(numbers[1]);
}

console.log(addTogether(2, 3));