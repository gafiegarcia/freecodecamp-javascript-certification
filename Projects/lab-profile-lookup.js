let contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    number: "0543236543",
    likes: ["Pizza", "Coding", "Brownie Points"],
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    number: "0994372684",
    likes: ["Hogwarts", "Magic", "Hagrid"],
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    number: "0487345643",
    likes: ["Intriguing Cases", "Violin"],
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    number: "unknown",
    likes: ["JavaScript", "Gaming", "Foxes"],
  },
];

console.log("\\\\ Profile Lookup \\\\" + "\n");

function lookUpProfile(name, property) {
  // let isContactExist = false
  // let isPropertyExist = false
  for (const contact of contacts) {
    if (contact.firstName === name) {
      // isContactExist = true;
      if (!Object.hasOwn(contact, property)) {
        return "No such property";
      } else {
        return contact[property];
      }
    }
  }
  return "No such contact";
}

console.log(`lookUpProfile("Kristian", "lastName"): `);
console.log(lookUpProfile("Kristian", "lastName"));
console.log();

console.log(`lookUpProfile("Sherlock", "likes"): `);
console.log(lookUpProfile("Sherlock", "likes"));
console.log();

console.log(`lookUpProfile("Harry", "likes"): `);
console.log(lookUpProfile("Harry", "likes"));
console.log();

console.log(`lookUpProfile("Bob", "number"): `);
console.log(lookUpProfile("Bob", "number"));
console.log();

console.log(`lookUpProfile("Bob", "potato"): `);
console.log(lookUpProfile("Bob", "potato"));
console.log();

console.log(`lookUpProfile("Akira", "address"): `);
console.log(lookUpProfile("Akira", "address"));
console.log();
