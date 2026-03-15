console.log("Confirm the Ending Tool\n");
console.log("returns \"true\" if the first string ends with the second string\n")

const confirmEnding = (stringInput, stringTarget) => stringInput.slice(stringInput.length - stringTarget.length) === stringTarget
  ? true
  : false;

console.log("confirmEnding(\"Bastian\", \"n\") returns: " + confirmEnding("Bastian", "n"));

console.log("confirmEnding(\"Congratulation\", \"on\") returns: " + confirmEnding("Congratulation", "on"));

console.log("confirmEnding(\"Connor\", \"n\") returns: " + confirmEnding("Connor", "n"));

console.log("confirmEnding(\"Walking on water and developing software from a specification are easy if both are frozen\", \"specification\") returns: " + confirmEnding("Walking on water and developing software from a specification are easy if both are frozen", "specification"));

console.log("confirmEnding(\"He has to give me a new name\", \"name\") returns: " + confirmEnding("He has to give me a new name", "name"));

console.log("confirmEnding(\"Open sesame\", \"same\") returns: " + confirmEnding("Open sesame", "same"));

console.log("confirmEnding(\"Open sesame\", \"sage\") returns: " + confirmEnding("Open sesame", "sage"));

console.log("confirmEnding(\"If you want to save our world, you must hurry. We don't know how much longer we can withstand the nothing\", \"mountain\") returns: " + confirmEnding("If you want to save our world, you must hurry. We don't know how much longer we can withstand the nothing", "mountain"));

console.log("confirmEnding(\"Abstraction\", \"action\") returns: " + confirmEnding("Abstraction", "action"));
