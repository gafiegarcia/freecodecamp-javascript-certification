const mdInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");
const mdRegex = [
  // block stuffs
  { md: /^# (.*)/gm, html: `<h1>$1</h1>` },
  { md: /^## (.*)/gm, html: `<h2>$1</h2>` },
  { md: /^### (.*)/gm, html: `<h3>$1</h3>` },
  { md: /^#### (.*)/gm, html: `<h4>$1</h4>` },
  { md: /^> (.*)/gm, html: `<blockquote>$1</blockquote>` },
  { md: /\n?---\n?/g, html: `\n<hr>\n` },
  {
    md: /^[-*+] .*?(?:\n|$(?![\s\S]))(?:^[ \t]*(?:[-*+]|\d+\.) .*?(?:\n|$(?![\s\S])))*/gm,
    html: `<ul>\n$&\n</ul>\n`,
  },
  {
    // forgot to copy the new anti-EOF change above here. already submitted anyway...
    md: /(?:^\d+\. (?<item>.*?$\n))(?:^[ \t]*(?:[-*+]|\d+\.) (?:.*?$\n))*/gm,
    html: `<ol>\n$&</ol>\n`,
  },
  {
    md: /(?:^(?:[-*+]|\d+\.) (?<pitem>.*?$)\n)(?<citem>(?:^(?: {2}| {4}|\t)[-*+] (?:.*?$\n))+)/gm,
    html: `  <li>\n    $<pitem>\n    <ul>\n$<citem>    </ul>\n  </li>\n`,
  },
  {
    md: /(?:^(?:[-*+]|\d+\.) (?<pitem>.*?$)\n)(?<citem>(?:^(?: {2}| {4}|\t)\d+\. (?:.*?$\n))+)/gm,
    html: `  <li>\n    $<pitem>\n    <ol>\n$<citem>    </ol>\n  </li>\n`,
  },
  {
    md: /^(?<indent>\s*)(?:[-*+]|\d+\.) (?<item>.*?$)/gm,
    html: `  $<indent><li>$<item></li>`,
  },
  {
    md: /^(?![ \t]*<)( *)(\S.*?)(?=\n(?:\n|[ \t]*<)|\n?$(?![\s\S]))/gms,
    html: `$1<p>$2</p>`,
  },
  // inline stuffs
  { md: /(\*\*|__)(.+?)\1/g, html: `<strong>$2</strong>` },
  { md: /(\*|_)(.+?)\1/g, html: `<em>$2</em>` },
  {
    md: /!\[(?<alt>.*?)\]\((?<src>.*?)\)/g,
    html: `<img alt="$<alt>" src="$<src>">`,
  },
  {
    md: /\[(?<text>.*?)\]\((?<url>.*?)\)/g,
    html: `<a href="$<url>">$<text></a>`,
  },
  { md: /`(.+?)`/g, html: `<code>$1</code>` },
];

function convertMarkdown() {
  let raw = mdInput.value;

  for (const rule of mdRegex) {
    raw = raw.replace(rule.md, rule.html);
  }

  return raw;
}

function handleConversion() {
  let output = convertMarkdown();
  htmlOutput.textContent = output;
  preview.innerHTML = output;
}

mdInput.addEventListener("input", () => {
  handleConversion();
});

// I was trying to reach obsidian level of forgivingness (it allows 2-4 spaces as indented list, flexibly, and it's relative to the parent, recursively... even though these are super edge cases that are very unlikely to happen due to Obsidian's editor already guiding the indentation automatically that it needs someone, like me, tinkering the spaces for each list and children lists to try to push the limit and find out the forgivingness...)
// Then I tried to model the logic from vs code's markdown parser...
// And then I realized that I can't get anywhere near a real parser with regex...
// that would require line-by-line parsing, and state management (keeping current indentation, when to open/close a list, etc. etc.)

// so I accept my newbieness, and now aim to create 1-level deep nesting and that's it...
// and also, turning off the paragraph detection for submission

const tabButtons = document.querySelectorAll(".mode-toggle");
const rawButton = document.getElementById("raw-html-tab");
const previewButton = document.getElementById("preview-tab");
const tabPanels = document.querySelectorAll(".preview-panel");

tabButtons.forEach((b) => {
  b.addEventListener("click", (e) => {
    tabButtons.forEach((btn) => {
      btn.ariaSelected = false;
    });
    tabPanels.forEach((p) => {
      p.hidden = true;
    });

    b.ariaSelected = true;
    b.ariaControlsElements[0].hidden = false;
  });
});

const demoBtn = document.getElementById("demo-markdown-btn");
const demoText = `## JS Documentation

### Introduction

JavaScript is a cross-platform, *object-oriented* scripting language. It is a **small** and _lightweight_ language.

### What you should already know

This guide assumes you have the following basic background:

- A general understanding of the Internet and the World Wide Web (WWW).
    - And a laptop and a good internet connection
    - The will to learn and not get bored by MDN website.
- Good working knowledge of HyperText Markup Language (\`HTML\`).
    1. \`ol\` inside \`ul\`
    2. I only managed one level-deep nesting!
- Some programming experience. If you are new to programming, try one of the tutorials linked on the main page about JavaScript.

### More Showcase
1. Again, list. The one I spent my time *the most*.
2. The cross-nesting works the other way around too
    - Embed \`ul\` inside \`ol\` like this
    - Although both of them in the same level of nesting isn't handled yet
    1. As you can see here!

This is awesome
without a separating blank line, two lines will be merged as a single paragraph

> Handling end of file really took time!
- Now stray list also works!`;

demoBtn.addEventListener("click", () => {
  mdInput.value = demoText;
  handleConversion();
});
