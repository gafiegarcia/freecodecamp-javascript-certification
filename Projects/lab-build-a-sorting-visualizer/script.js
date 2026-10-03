const arrayContainer = document.getElementById("array-container");
const startingArray = document.getElementById("starting-array");
const generateBtn = document.getElementById("generate-btn");
const sortBtn = document.getElementById("sort-btn");

// assuming the range is fixed at 1-100 inclusive, based on spec
const generateElement = () => Math.floor(Math.random() * 100) + 1;
// also assuming the length is fixed at 5
const generateArray = () => Array.from({ length: 5 }, generateElement);

const generateContainer = () => document.createElement("div");
// also assuming `array` is always the one from `generateArray()` so this will always produce 5 spans...
const fillArrContainer = (element, array) => {
  array.forEach((n) => {
    const newSpan = document.createElement("span");
    newSpan.textContent = String(n);
    element.appendChild(newSpan);
  });

  return element;
};

const isOrdered = (a, b) => a <= b;
const swapElements = (array, i) => {
  if (isOrdered(array[i], array[i + 1])) return null;

  [array[i], array[i + 1]] = [array[i + 1], array[i]];

  return [i, i + 1];
};
const highlightCurrentEls = (element, i) => {
  const childrenToHighlight = [element.children[i], element.children[i + 1]];
  childrenToHighlight.forEach((childEle) => {
    childEle.style.border = "2px dashed red";
  });
};

const visualizeBubbleSort = () => {
  const array = Array.from(startingArray.childNodes, (ele) => Number(ele.textContent));
  let currentContainer = startingArray;
  let sorted = false;
  
  while (!sorted) {
    let hasSwap = false;
    
    for (let i = 0; i < array.length - 1; i++) {
      highlightCurrentEls(currentContainer, i);
      if(swapElements(array, i)) {
        hasSwap = true;
      }

      currentContainer = fillArrContainer(generateContainer(), array);
      arrayContainer.appendChild(currentContainer);
    }

    if (!hasSwap) sorted = true;
  }

  currentContainer.style.border = "4px solid green";
};

generateBtn.addEventListener("click", () => {
  const siblings = Array.from(arrayContainer.querySelectorAll("#starting-array ~ div"));

  siblings.forEach((ele) => ele.remove());
  startingArray.textContent = "";
  fillArrContainer(startingArray, generateArray());
  sortBtn.toggleAttribute("hidden", false);
});

sortBtn.addEventListener("click", () => {
  sortBtn.toggleAttribute("hidden", true);
  visualizeBubbleSort();
});
