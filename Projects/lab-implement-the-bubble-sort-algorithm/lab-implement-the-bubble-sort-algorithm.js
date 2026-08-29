console.log("—— Bubble Sort! ——\n");

function bubbleSort(arr) {
  if (arr.length < 1) return arr;

  for (let i = arr.length; i > 1; i--) {
    for (let j = 0; j < i - 1; j++) {
      const a = arr[j];
      const b = arr[j + 1];
      if (a > b) {
        arr[j] = b;
        arr[j + 1] = a;
        // console.log(`swapped ${a} with ${b}`);
      }
    }
  }

  return arr;
}

console.log(
  bubbleSort([
    1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92,
  ]),
);
// Zed prettier format on save did this; I'm not that insane to write wrapping lines manually like that

// post-review retry!
function bubbleSortv2(arr) {
  for (let i = arr.length; i > 1; i--) {
    let swapped = false;

    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }

    if (!swapped) return arr;
  }

  return arr;
}
