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

// Claude review: 

/*
  1. const MAX_CHARS = 50;

    I know why.

  2. reach for textContent before innerText

    innertext trigger a layout reflow

  3. Toggle a class instead of inline .style.color

    don't mix styling into JS
    this way, the "resetting style at every keystroke" is not needed

  4. count = textInput.value.length;  // count is guaranteed to be 50 here

    After slicing to a max of 50, recomputing .length just to get 50 back is wasted work. count = MAX_CHARS; says the same thing more clearly.
  
  ---

  # Look-ahead (don't worry about now)

  The slice-on-overflow approach is correct for this lab's "trim extra input" requirement, but it has a subtle UX quirk: if the user pastes text into the middle of an already-near-max textarea, you'll lop off the end rather than what they pasted. Real apps handle this with the `beforeinput` event (which lets you prevent the input before it happens) or by tracking selection ranges. File it away — not needed now.

*/