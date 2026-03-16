/*
  The tests only required the functions to be able to handle
  one input at a time.
  If the program were to support multiple menus (arguments),
  then using `...` rest parameter on the add functions and
  spread syntax `...` on the push() method inside the function
  body would be necessary
*/

console.log("Lunch Picker Program\n")

const lunches = [];

function addLunchToEnd(arr, lunch) {
  arr.push(lunch);
  console.log(
    `${lunch} added to the end of the lunch menu.`
  );
  return arr;
}

function addLunchToStart(arr, lunch) {
  arr.unshift(lunch);
  console.log(
    `${lunch} added to the start of the lunch menu.`
  );
  return arr;
}

function removeLastLunch(arr) {
  let lastLunch = arr.pop();
  lastLunch !== undefined
    ? console.log(
      `${lastLunch} removed from the end of the lunch menu.`
    )
    : console.log(
      "No lunches to remove."
    );
  return arr;
}

function removeFirstLunch(arr) {
  let firstLunch = arr.shift();
  firstLunch !== undefined
    ? console.log(
      `${firstLunch} removed from the start of the lunch menu.`
    )
    : console.log(
      "No lunches to remove."
    );
  return arr;
}

function getRandomLunch(arr) {
  let randomLunch = arr[Math.floor(
    Math.random() * (arr.length)
    )];
  randomLunch !== undefined
    ? console.log(`Randomly selected lunch: ${randomLunch}`)
    : console.log(`No lunches available.`)
}

function showLunchMenu(arr) {
  arr.length > 0
    ? console.log(`Menu items: ${arr.join(", ")}`)
    : console.log(`The menu is empty.`);
}

addLunchToEnd(lunches, "Omelette");
showLunchMenu(lunches);

addLunchToStart(lunches, "Nasi Kebuli");
showLunchMenu(lunches);

removeFirstLunch(lunches);
showLunchMenu(lunches);

removeLastLunch(lunches);
showLunchMenu(lunches);

removeFirstLunch(lunches);
showLunchMenu(lunches);

getRandomLunch(["Burger", "Hamburger", "Fried Rice"])
showLunchMenu(lunches);

addLunchToEnd(lunches, "Shawarma")
showLunchMenu(lunches);
