const palindromeTipButton = document.getElementById("palindrome-tip-btn");
const palindromeTip = document.getElementById("palindrome-tip");
const checkButton = document.getElementById("check-btn");
const textInput = document.getElementById("text-input");
const result = document.getElementById("result");

const regex = /[\W_]/g;
const sanitizedInput = (str) => {
  return str.replaceAll(regex, "");
};
const reverseString = (str) => {
  return [...str].reverse().join("");
};
const isPalindrome = (str) => {
  const reversedString = reverseString(str);
  return reversedString.toLowerCase() === str.toLowerCase();
};

checkButton.addEventListener("click", () => {
  if (textInput.value === "") {
    alert("Please input a value");
    return;
  }
  if (isPalindrome(sanitizedInput(textInput.value))) {
    result.textContent = `${textInput.value} is a palindrome`;
  } else {
    result.textContent = `${textInput.value} is not a palindrome`;
  }
});

// I'd like to just hit Enter and not having to move my mouse or press Tab just to click the damn Check button
textInput.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;
  checkButton.dispatchEvent(new MouseEvent("click"));
});

palindromeTipButton.addEventListener("click", toggleTip);

function toggleTip() {
  const expanded = !palindromeTip.hidden;
  palindromeTipButton.ariaExpanded = !expanded;
  palindromeTip.hidden = expanded;
}

// REVIEW BY GPTpapap

// 1. The `<h1>` button is creative, but still a bit awkward
//  it may be announced awkwardly by screen readers: "heading level 1, Palindrome button collapsed, Checker"
//  it'd be better if I use separate help/disclosure button; or even just put <details> down below where it belongs

// 2. Form behavior: works, but not ideal
//  This is due to fcc kinda implying to use a button to process js *on click*, not on "form submit" or whatever
//  The proper way would be to wrap them in a <form>, then handling the form submission instead of
//    a). manual click handling on the button and b). manual keydown handling on the input[type="text"], faking a button click
//  Using form will automatically make Enter key work, and more accessible & idiomatic.

// 3. Button types are not specified
//  Since they are not inside a form, this is not breaking anything. But as a habit:
//    - disclosure/help buttons should usually be `type="button"`
//    - form submission buttons should be `type="submit"`
//  This prevents surprise behavior later if you wrap things in a form.

// 4. Input label is accessible, but not visible
//  Screen readers get the label describing the input box, but sighted users don't.
//  I genuinely thought I didn't need it at all because how the UI is arranged should be explanatory enough.
//  Even so, a visible label or helper text would still improve usability. And a good habit too.

// 5. Focus styles: improved, but some are still subtle
//  I'm torn between letting the input box's and check button's :focus styling be subtle & looking good,
//  and making it super obvious
//  Changing only the border color can be okay, but it’s usually weaker than an actual outline/box-shadow
//  When I remove outline, the best practice is to make the replacement obvious/equally visible.

// 6. JS logic edge case where there are only punctuation
//  "!!!" input would technically pass after sanitization
//  If I want to make it more robust I gotta have to block that input, just like what I did per the requirements using alert(), but after sanitization

// 7. Minor JS style note
//  This works: palindromeTipButton.ariaExpanded = !expanded;
//  But as fcc *repeatedly* demonstrated, this is more explicit: palindromeTipButton.setAttribute("aria-expanded", String(!expanded));
//  I'm relying too much on the type coercion/stringification/inherent value conversion, which is, okay for now, but...

// GPT Verdict and Recap

/*
  Strong:
    - Real buttons
    - Proper input label
    - `role="status"` for result feedback
    - Correct basic disclosure pattern with `aria-expanded` + `hidden`
    - Clean, readable JS functions

  Improve next time:
    1. Keep the disclosure content close to the disclosure button in the DOM. -> the help text/tip/disclosure content
    2. Prefer a real `<form>` over manual Enter-key handling.
    3. Make focus indicators stronger. -> gotta find the balance between design aesthetics and a11y
    4. Consider visible input guidance, not only an `sr-only` label. -> I overrelied on UI/visible cues for sighted users, while screen readers get more aaccess...
    5. Avoid putting interactive controls inside headings unless you have a strong reason. -> I was being too creative with it. In this project, I was being both too careful with a11y on some parts and totally mess it up somewhere else.
*/
