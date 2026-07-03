let fullName = "Jane Doe";

let firstNameIndexStart = 0;
let firstNameIndexEnd = fullName.indexOf(" ");
let firstName = fullName.slice(firstNameIndexStart, firstNameIndexEnd);

let lastNameIndexStart = firstNameIndexEnd + 1;
let lastNameIndexEnd = fullName.length; // for the sake of knowing how many characters there are, I'm keeping this line
let lastName = fullName.slice(lastNameIndexStart);

console.log("Name: " + fullName)
console.log("firstNameIndexStart: " + firstNameIndexStart)
console.log("firstNameIndexEnd: " + firstNameIndexEnd)
console.log(`lastNameIndexStart: ${lastNameIndexStart}`)
console.log(`lastNameIndexEnd: ${lastNameIndexEnd}`)
console.log(`firstName: ${firstName}`)
console.log(`lastName: ${lastName}`)
