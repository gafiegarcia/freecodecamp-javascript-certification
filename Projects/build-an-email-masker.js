function maskEmail(email) {
  let domainIndex = email.indexOf("@"
  );

  return email.slice(0, 1) 
    + "*".repeat(domainIndex - 2) 
    + email.slice(domainIndex - 1, domainIndex) 
    + email.slice(domainIndex);
}

let email = "kamenr1der@jmail.com";
console.log(maskEmail(email));

email = "apple.pie@example.com";
console.log(maskEmail(email));

email = "freecodecamp@example.com";
console.log(maskEmail(email));

email = "info@test.dev";
console.log(maskEmail(email));

email = "user@domain.org";
console.log(maskEmail(email));
