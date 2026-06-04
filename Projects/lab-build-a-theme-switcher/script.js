const themes = [
  {
    name: "ivory",
    message: "Welcome to the bright side!",
  },
  {
    name: "obsidian",
    message: "You just joined the dark side...",
  }
];

const themeSwitcherBtn = document.getElementById("theme-switcher-button");
const themeMenu = document.getElementById("theme-dropdown");
const themeBtns = document.querySelectorAll('#theme-dropdown li[role="menuitem"]');
const statusMsg = document.getElementById('theme-status-msg');

themeSwitcherBtn.addEventListener("click", () => {
  const isClosed = themeMenu.hidden;

  themeSwitcherBtn.ariaExpanded = isClosed;
  themeMenu.hidden = !isClosed;
})

themeBtns.forEach(theme => {
  const themeName = theme.textContent.toLowerCase();
  const themeObj = themes.find(t => t.name === themeName);
  const themeMsg = themeObj.message;

  theme.addEventListener("click", () => {
    document.querySelector("body").className = `theme-${themeName}`;

    statusMsg.textContent = themeMsg;

    closeThemeMenu();
  });
});

function closeThemeMenu() {
  themeSwitcherBtn.ariaExpanded = false;
  themeMenu.hidden = true;
}

// gonna use a new word I just learn:
// ✨ a11y ✨

window.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (themeMenu.hidden) {
    statusMsg.textContent = "";
  }

  closeThemeMenu();
})

document.addEventListener("click", e => {
  if (
    themeSwitcherBtn.contains(e.target) ||
    themeMenu.contains(e.target)
  ) return;

  closeThemeMenu();
})

// CODEX REVIEW

/*

1. in this scenario, button is preferred (built-in a11y: keyboard-focusable without manual tabIndex). li doesn't have that, so as it is right now, it's not keyboard-focusable -> bad a11y.
  - button built-in a11y:
    1. keyboard-focusable
    2. Enter/Space activation without manual tabindex/keydown handling
  - quick note: if user clicks it to perform an action, then reach for <button> first.
  - semantically and functionally correct: `<li><button type="button">...</button></li>`. 
  - tip from codex: if the current theme is selected, mark that button with something like `aria-pressed="true"` or `aria-current="true"` depending on the UI model (future a11y study needed)
2. body class: "remove old class, add new class" instead of what I'm doing now, rewriting body.className directly. I was lazy because I knew there'd be no other classes on body, but yeah, I have to remember that that's not the best practice
3. .find() logic depending on markup textContent: I figured fcc required the <li> content name to be the exact same as the object.name in themes array (except for the capitalization), so .find(t => t.name === li.textContent.toLowerCase()) would always work in this project, BUT even so, I should've tried to make the code more robust to handle the matching logic without relying on UI text.
4. `transition: all`: just don't. I should be mindful of which properties I want to actually have transitions on, and by doing that avoiding "surprise" transition that I don't intend. and remember bro: your `body { transition: all }` doesn't even cover all theme-bound changes you intended, as `transition` also needs to be on the actual elements that use the custom props...newb
5. `li` styling: I forgive myself for this, as this lab test suite doesn't even allow any other <li> that isn't [role="menuitem"]; but EVEN SO it's best practice to use selectors accurately; specific selector for specific styling, broad selector for broad/base styling. be intentional with selector. build habits...because untraining bad habits sucks.
6. (very minor) <div class="hr">. I already had `hr` reset styles from my snippet, so why didn't I just use it and add minor modification as-needed...

*/
