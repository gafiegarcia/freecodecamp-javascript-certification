console.log("— Matching Object Filter —\n");

function whatIsInAName(inputObjects, sourceObject) {
  // const matchingObjects = [];

  function isMatchingSource(object) {
    for (const prop in sourceObject) {
      if (object[prop] !== sourceObject[prop]) {
        return false;
      }
    }
    return true;
  }

  return inputObjects.filter(isMatchingSource)
}

const source = { last: "Capulet", first: "Tybalt", };
for (const prop in source) {
  console.log(prop)
}

// elegant solution from gpt-5.5
// function whatIsInAName(inputObjects, sourceObject) {
//   return inputObjects.filter(object =>
//     Object.keys(sourceObject).every(prop =>
//       object[prop] === sourceObject[prop]
//     )
//   );
// }
