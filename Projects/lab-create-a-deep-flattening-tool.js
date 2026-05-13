console.log("— Deep Flattening Tool —\n");

function steamrollArray(nestedArray) {
  const result = [];
  for (const item of nestedArray) {
    if (Array.isArray(item)) {
      for (const value of item) {
        result.push(value);
      }
    } else {
      result.push(item);
    }
    // console.log(result)
  }

  if (result.some(Array.isArray)) {
    return steamrollArray(result);
  } else return result;
}

console.log(steamrollArray([[["a"]], [["b"]]]));

// Better solution from Claude:

/*

function steamrollArray(nestedArray) {
  const result = [];
  for (const item of nestedArray) {
    if (Array.isArray(item)) {
      result.push(...steamrollArray(item));
    } else {
      result.push(item);
    }
  }
  return result;
}

*/

// spreading the function result means turning something like [[a], [[b]]] -> [a], [[b]] and recursively, [a] -> a, [[b]] -> [b] and so on.
// my original hybrid approach is peeling off every bracket layer one by one along with passing through other non-array items. this recursive solution by Claude only does so recursively when the item is an Array. 

// KEY LEARNING POINT: we can spread a function result *if* it's an iterable, which in this case, an array. 

// KEY LEARNING POINT: the .concat() method peels of an array brackets of an argument a.k.a. FLATTENING ONE LEVEL. this quirk of the .concat() method if part of the spec, so it's stable. so alternative solution would be something like:
/*

function steamrollArray(nestedArray) {
  let result = [...nestedArray];
  while (result.some(Array.isArray)) {
    result = [].concat(...result);
  }
  return result;
}

*/

// This logically makes sense — flatten one level after every check of .some() that returns true.

// KEY LEARNING POINT: 
/*
Why recursive usually wins:
The while version's hidden cost is .some(). On a mostly-flat array with one stubborn nested element near the end, .some() has to scan almost everything before finding it — and it does this on every iteration. The recursive version never asks "are we done yet?" — it just naturally stops when it hits non-array elements.
*/


// For this exact problem, Array.prototype.flat() is the modern js solution. It's not used due to the instructions:

/*
Create a Deep Flattening Tool

In this lab, you will be implementing an array flattening algorithm.

Flattening an array means turning a nested array of any depth into a single, one-dimensional array. The process extracts all elements in order, unwrapping only arrays. Other types are left unchanged.

For example:
Original 	Flattened
[[1], [], [2, [3]]] 	[1, 2, 3]
[1, {"foo": "bar"}, [2]] 	[1, {"foo": "bar"}, 2]
["baz", [1, 2], {}] 	["baz", 1, 2, {}]

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

  1. You should have a function named steamrollArray.
  2. The steamrollArray function should accept one argument: a nested array.
  3. The function should flatten the nested array, accounting for varying levels of nesting.
  4. Your solution should not use the Array.prototype.flat() or Array.prototype.flatMap() methods.
  5. Global variables should not be used.

*/
