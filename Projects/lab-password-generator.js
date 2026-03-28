console.log("Password Generator App" + "\n");

function generatePassword(pwLength) {
  const pwCharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let result = "";

  for (let i = 0; i < pwLength; i++) {
    const randomIndex = Math.floor(Math.random() * pwCharSet.length);
    result += pwCharSet[randomIndex];
  }
  
  return result;
}

// tests
let password = generatePassword(2);
console.log("Generated password: " + password);

password = generatePassword(8);
console.log("Generated password: " + password);
