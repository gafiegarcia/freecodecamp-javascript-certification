# Review Lab: Build a Sorting Visualizer

time for /review-fcc-project !

so usually, I copy the user story from the lab project page directly (drag select and ctrl-c) then match the styling manually. this time, I thought "why don't I just copy from fcc repo, which might already have the styling?" and so I did. and I discovered that the source file includes the actual tests (not just list of test titles like "1. You should have a function named `generateElement`"), the "seed" (the given boilerplate), and the "solution", which can be seen by students by clicking "this example project" (which shows an iframe for students to take a peek at how the project should end up... and where cheating students may copy from in RWD, lol) and wrapped in a boilerplate paragraph "Build an app that is ..." (which doesn't exist in the source file and I manually copied so the saved user-story matches what I see on the lab project page).

I was about to delete everything after "**Tests**" (which was written as "# --tests--" if I remember correctly, I think some templating thing in fcc repo that I don't fully understand yet — I changed it to "**Tests**" because it was what I actually see on the page) to match what students actually see, but then the Tests section itself already contains things a student is not supposed to see.

and because of this too, I discovered how the solution uses `display` css prop to show and hide the sort button (a mechanism that wasn't really part of the spec if I remember correctly, but I know would hurt usability if not done, as it may lead to bugs if clicked twice) where I use the easy `hidden` html attribute. both ways visually look the same as far as I see, so gonna need to hear from you which one is desirable in this scenario

I also notice the author uses `arrayLength`, `minVal`, and `maxVal` global variables... which I wish I used instead. Anyway, also curious... because Claude taught me that usually, for constants like this, the screaming snake case is usually used instead of camelCase ... but still, the solution js is cleaner (even though I feel like `showSortBtn` and `hideSortBtn` is too much abstraction... but who am I to say that...)

anyway, because of the quirks of the test — not using actual optimized Bubble Sort, "dictating" almost every step — every time I "improvise" during writing, I found myself going against the spec, so I sticked to reading a line from spec -> write -> repeat, so yeah, not much improvisation except for the event listeners and the helpers around it

# Claude

Overall this is a **strong submission**, and in several places it's better than the official solution. Your instinct that the solution is "cleaner" is only half right. It does a few things more neatly, but it also has one real bug and a couple of fragile spots that your version avoids. We'll get to those.

First, your side questions, since they're good ones.

---

## Your questions

### 1. The `user-story.md` with tests, seed and solution

What you found is fCC's **challenge file format**. Each challenge is a markdown file that their build tooling splits into sections using markers like `# --seed--`, `## --seed-contents--` and `# --solutions--`. I'm fairly sure the tests section is really `# --hints--`, not `--tests--`, since that's what fCC calls the "text + test code" pairs. Each hint is the sentence you see on the page plus a code block that runs in your browser using **Chai's `assert`**.

Some things in there are worth learning from:

- **`__helpers.RandomMocker`** swaps `Math.random` for a fixed, predictable sequence. That's how a test can expect `[26, 9, 58, 23, 38]` from a "random" function. Think of it as a loaded die: the test controls the roll, so it knows the answer.
- **`generateArray.toString()` + regex** shows that some tests read your **source code as text**. That explains why fCC sometimes insists you "use function X": a regex is literally checking that the name appears.

**What to keep:** it's your personal repo and you've already solved the project, so spoilers don't matter anymore. I'd keep the tests (they're good examples of how to test DOM code) and trim `--seed--` and `--solutions--`, or move them into a separate `reference.md` so `user-story.md` still matches what you saw as a student.

### 2. `hidden` attribute vs. `style.display`: go with `hidden`

Your choice is the better one here:

- `hidden` says **what** you mean ("this isn't relevant right now"). `display: none` describes **how it looks**.
- The solution's `showSortBtn` has to hard-code `"inline-block"`, which means it has to know and repeat the button's original display value. If the button were ever `display: flex`, that code would quietly break it.

There's one gotcha you should know. `hidden` works through a very weak built-in browser rule (`[hidden] { display: none }`). If your own CSS gives that element a `display` (say `button { display: inline-block }`), your rule wins and **`hidden` stops working**. Your CSS doesn't do that, so you're fine, but keep it in mind for later projects.

A small improvement: instead of `toggleAttribute`, use the property directly.

```js
sortBtn.hidden = false; // script.js:68
sortBtn.hidden = true; // script.js:72
```

It reads like plain English, and `toggleAttribute(name, force)` is really meant for the actual _toggling_ case.

### 3. Constants: `arrayLength` vs. `ARRAY_LENGTH`

What Claude told you before is a real convention, but here's the rule more precisely: **`SCREAMING_SNAKE_CASE` is for hard-coded configuration values you know before the program runs**, like `MAX_VALUE = 100` or `ARRAY_LENGTH = 5`. **Not every `const` qualifies.** `arrayContainer` is a `const`, but it holds a DOM element looked up at runtime, so it stays camelCase. The fCC solution uses camelCase for everything, which is also common. Pick one style and stick with it.

You're right that pulling out the magic numbers (`100`, `5`) would beat comments like "assuming the range is fixed at 1-100". Notice, though, that the solution's constants are **less configurable than they look**:

```js
Math.floor(Math.random() * maxVal + minVal);
```

This only works because `minVal` is 1. Set `minVal = 10` and you get numbers from 10 to 109. The general formula is `Math.floor(Math.random() * (max - min + 1)) + min`. So naming a constant doesn't automatically make the code correct for other values.

### 4. Are `showSortBtn` / `hideSortBtn` too much abstraction?

Your instinct is right, for a good reason. **An abstraction earns its place when it hides a messy detail behind a clear name.**

- In the solution, `sortArrayBtn.style.display = "inline-block"` is a bit noisy, so a name like `showSortBtn()` actually helps.
- In your version, `sortBtn.hidden = false` is already as clear as `showSortBtn()`. A wrapper would add a name and hide nothing.

So it isn't "too much" in general. It's that your approach doesn't need it.

---

## 1. Is there a more efficient or idiomatic solution?

### Merge the two loop flags: `sorted` + `hasSwap` (script.js:41–57)

Both flags are tracking the same fact. `sorted` is just `!hasSwap` set one step later. One flag does the job:

```js
let hasSwap = true;
while (hasSwap) {
  hasSwap = false;
  for (let i = 0; i < array.length - 1; i++) {
    highlightCurrentEls(currentContainer, i);
    if (swapElements(array, i)) hasSwap = true;
    currentContainer = fillArrContainer(generateContainer(), array);
    arrayContainer.appendChild(currentContainer);
  }
}
```

Having fewer variables that mean the same thing means fewer chances for them to disagree.

### Make `swapElements` return `true`/`false` (script.js:25–29)

Using the return value to report "did a swap happen?" is a **great** idea; more on that below. But returning `[i, i + 1]` or `null` works only because arrays are truthy. The indices themselves are never used. When a value only answers a yes/no question, a boolean says so:

```js
if (isOrdered(array[i], array[i + 1])) return false;
[array[i], array[i + 1]] = [array[i + 1], array[i]];
return true;
```

### Small cleanups

- **script.js:39**: use `.children` instead of `.childNodes`. `childNodes` also includes text nodes (whitespace, stray text). It's safe today only because you clear with `textContent = ""` first. `.children` gives you only elements.
- **script.js:63**: the `Array.from` isn't needed, because `querySelectorAll` returns a NodeList, which already has `.forEach`. Also, nice use of the `~` sibling selector. That's your RWD CSS knowledge paying off in JS.
- **script.js:12**: the comment undersells your code. `fillArrContainer` creates **one span per array item**, whatever the length. It isn't tied to 5, which makes it more general than the comment says.

## 2. Beginner pitfalls to fix early

There's nothing serious. One edge case is worth understanding, though.

**`swapElements` trusts its caller (script.js:24).** Try `swapElements([1, 2, 3], 2)`: `array[3]` is `undefined`, and `3 <= undefined` is `false`. So it "swaps," and you get `[1, 2, undefined, 3]`. The array **grew**. Your loop never passes the last index, so your app can't hit this. Still, it's a good habit to ask: "if someone else called this function with odd input, what would happen?" The fCC solution guards against it with `n < arr.length - 1`. That's optional here, but it's worth knowing why it's there.

## 3. What you did well (keep doing these!)

- **Your `generateContainer` is pure, and the solution's isn't.** This fits the Functional Programming module you're in right now. The spec says "creates and returns an empty `div`." Yours does exactly that. The solution's version also **appends it to the page**, a hidden side effect that a reader wouldn't expect from the name. You kept "create" and "attach" separate, at lines 52–53. 👏
- **`fillArrContainer` returns the element**, which lets line 52 chain it with `generateContainer()` nicely.
- **You keep the data in a JS array.** You read the DOM **once** (line 39) and then sort a real array. The solution reads the numbers **back out of the DOM at every step** by parsing ids like `number-26`. That has a real bug: if the array has two 26s, the page gets **two elements with the same id**, which is invalid HTML.
- **You keep `#starting-array` alive.** Removing only the siblings means your `startingArray` reference (line 2) stays valid. The solution resets with `innerHTML`, which **destroys and recreates** `#starting-array`, so any saved reference to the old element would silently point at a detached ghost. The solution gets away with it by re-querying every time. Your way is sturdier.
- **`textContent` instead of `innerText`** is the faster, more predictable choice.
- **Hiding the sort button.** You spotted on your own that clicking it twice would cause trouble, even though the spec didn't ask for it. That's real product thinking.
- **Following the spec line by line** wasn't a lack of creativity. When tests check exact step counts (13 divs) and exact highlight positions, matching the spec precisely is the correct engineering choice. Your "improvisations" went into the places that had room for them: the event handlers.

---

## Look ahead

You noticed the tests require a **non-optimized** bubble sort. In the classic optimization, after each pass the largest remaining number has "bubbled" to the end, so the next pass can stop one index earlier (`i < array.length - 1 - pass`). The tests here expect all 4 comparisons on every pass. That's why the spec feels like it's "dictating": the expected output was built from the simple version. You can compare this with your earlier "Implement the Bubble Sort Algorithm" lab.

Also, all 13 steps show up **instantly**, so it isn't much of a _visualization_ yet. In the next module (**Asynchronous JavaScript**) you'll learn tools like `setTimeout` and `async`/`await` that would let you show one step at a time, like an animation. That would be a fun upgrade to come back to. 🎬
