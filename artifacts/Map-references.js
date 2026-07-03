const myTreesMap = new Map();
myTreesMap.set({ type: "deciduous" }, "Maple tree");
myTreesMap.set([1, 2], "Pine tree");
myTreesMap.set(42, "Oak tree");
myTreesMap.set(true, "Birch tree");
myTreesMap.set(function bolo() {
  return "I'm a function key";
}, "Willow tree");

// myTreesMap.forEach((i, j, k) => {
//   console.log(i);
//   console.log(j);
//   console.log(k);
// });

console.log(
  Array.from(myTreesMap.keys()).find((key) => typeof key === "function")(),
);

// Map reference examples:

// 1) Check how many key/value pairs are in the Map
console.log("Map size:", myTreesMap.size);

// 2) Add a new item with .set(key, value)
myTreesMap.set("evergreen", "Cedar tree");
console.log("After adding cedar:", myTreesMap);

// 3) Get a value by its key with .get(key)
console.log("Get evergreen:", myTreesMap.get("evergreen"));

// 4) Check whether a key exists with .has(key)
console.log("Has key 42?", myTreesMap.has(42));
console.log("Has key 'fruit'?", myTreesMap.has("fruit"));

// 5) Delete an item by key with .delete(key)
myTreesMap.delete(true);
console.log("After deleting key true:", myTreesMap);

// 6) Loop through keys, values, and entries
console.log("Keys:");
for (const key of myTreesMap.keys()) {
  console.log(key);
}

console.log("Values:");
for (const value of myTreesMap.values()) {
  console.log(value);
}

console.log("Entries:");
for (const [key, value] of myTreesMap.entries()) {
  console.log(key, value);
}

// 7) Convert a Map to an array
const mapAsArray = Array.from(myTreesMap); // same as [...myTreesMap]
console.log("Map as array:", mapAsArray);

// 8) Create a new Map from an array of key/value pairs
const fruitTreesMap = new Map([
  ["apple", "Apple tree"],
  ["cherry", "Cherry tree"],
  ["lemon", "Lemon tree"],
]);
console.log("Fruit trees Map:", fruitTreesMap);

// 9) Remove everything from a Map with .clear()
fruitTreesMap.clear();
console.log("Fruit trees Map after clear:", fruitTreesMap);
