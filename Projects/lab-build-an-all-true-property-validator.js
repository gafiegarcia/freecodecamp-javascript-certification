function truthCheck(collection, pre) {
  if (collection.every(object => object[pre])) {
    return true
  }
  return false;
}

console.log(
  truthCheck(
    [{
      name: "Quincy", 
      role: "Founder", 
      isBot: false
    }, {
      name: "Naomi",
      role: "",
      isBot: false
    }, {
      name: "Camperbot", 
      role: "Bot", 
      isBot: true
    }], 
    "name"
  )
);

// REVIEW NOTES from opencode big-pickle (lol, this one is smart)
/*
2. 🚩 One improvement: the unnecessary if

The if statement wrapping the return is redundant. .every() already returns true or false, so you can return it directly:

function truthCheck(collection, pre) {
  return collection.every(object => object[pre]);
}
*/

/* 
# fcc instructions

Build an All-True Property Validator

In this lab you will test a specific property of each object in an array to see if it always has a truthy value or not.

For example, you could be asked to test one property of the objects in an array like the following:

[{
    name: "Quincy",
    role: "Founder",
    isBot: false
}, {
    name: "Naomi",
    role: "",
    isBot: false
}, {
    name: "Camperbot",
    role: "Bot",
    isBot: true
}]

If you were asked to test the name property, in the objects of this array the property name has the values of "Quincy", "Naomi", and "Camperbot", so it is always truthy.

If you were asked to test the role property, the values are "Founder", "", and "Bot", in this case "" is a falsy value, so the values are not always truthy.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

  1. You should have a function named truthCheck.
  2. The truthCheck function takes two arguments: an array of objects and a string representing a property name found in those objects.
  3. The function should check if the property with the name equal to the second argument has a truthy value in all the objects of the array, and return true if it has, and false otherwise.

*/