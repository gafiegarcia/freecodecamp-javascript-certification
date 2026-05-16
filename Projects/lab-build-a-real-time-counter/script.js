const textInput = document.getElementById("text-input");
const charCount = document.getElementById("char-count");

textInput.addEventListener("input", () => {
  let count = textInput.value.length;

  // resetting style at every keystroke
  charCount.style.color = "inherit";

  // if max count => trim value -> recalculate count -> set red color for the counter
  if (count >= 50) {
    textInput.value = textInput.value.slice(0, 50);
    count = textInput.value.length;
    charCount.style.color = "red";
  }

  // print count number to the counter
  charCount.innerText = `Character Count: ${count}/50`;
})
