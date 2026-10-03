## Review: Build an Optional Arguments Sum Function 🎉

**Overall: this is a strong, clever solution.** I ran all 10 fCC tests and they pass. I also tried some cases the tests skip, and those work too:

| Call | Result | Why it's right |
| --- | --- | --- |
| `addTogether()` | `undefined` | Nothing to add |
| `addTogether(NaN)` | `undefined` | Your `Number.isNaN` check catches it |
| `addTogether(2)(NaN)` | `undefined` | The returned function checks its input too |
| `addTogether(2)()` | `undefined` | A missing second number is rejected |
| `addTogether(1, 2, 3)` | `3` | Extra arguments are ignored, which is reasonable |

The part you said was tricky is also the best idea in the file. Look at line 18:

```js
return addToA(numbers[1]);
```

You made the two-argument case reuse the one-argument machinery. So `addTogether(2, 3)` really runs as `addTogether(2)(3)`. The "check it's a number, then add" logic exists in **one place only**. That's currying used well.

---

### 1. Is there a simpler or more idiomatic version (using what you've learned)?

Yes, a little simpler. Your `slice` + `every` + `length === 0` check works, but there's a quieter way to get the same result.

**A side lesson first:** you needed `numbers.length === 0 ||` on line 9 because `[].every(...)` returns `true` on an empty array. JavaScript reasons like this: "every item passed the test? There are no items, so none of them failed. True!" This is called **vacuous truth**. It's a classic trap, and you avoided it. 👏

**The simpler version:** use destructuring (you've met it in the Object Destructuring lesson; arrays work the same way) and `args.length`:

```js
function addTogether(...args) {
  const [a, b] = args;
  if (!isValidNumber(a)) return undefined;

  const addToA = (n) => (isValidNumber(n) ? a + n : undefined);

  return args.length === 1 ? addToA : addToA(b);
}
```

Compared with yours:
- **No `slice`, `every` or empty check.** `addTogether()` makes `a` equal `undefined`, so `isValidNumber(a)` already rejects it.
- **Each value gets checked exactly once.** `a` is checked up front, and `b` is checked inside `addToA`. Yours checks `numbers[1]` twice, once in `every` and again inside `addToA`. That doesn't cause any bug; it's just repeated work.
- **Why `args.length` and not `b === undefined`:** test 5 is `addTogether(5, undefined)`. That call *does* pass two arguments, so it should return `undefined`, not a function. `args.length` counts arguments that were explicitly passed as `undefined`. Checking `b === undefined` couldn't tell "passed undefined" apart from "passed nothing." Your version handles this correctly too, because `slice` keeps the explicit `undefined`.

This is a small improvement, not a fix. Your version is fine.

### 2. Beginner habits to fix before they stick

Just one, and it's about style (lines 8–12):

```js
if (
  numbers.length === 0 ||
  !numbers.every(isValidNumber)
)
  return undefined;
```

An `if` without braces is fine on **one line** (`if (x) return y;`). Once the condition spans several lines, the body without braces is easy to miss. Someone might later add a second line under it, thinking it's inside the `if`, and it won't be. A good rule: **if the `if` doesn't fit on one line, use braces.**

```js
if (numbers.length === 0 || !numbers.every(isValidNumber)) {
  return undefined;
}
```

Nothing else to flag.

### 3. What you did well (keep doing these!)

- **Pulling `isValidNumber` out as its own function (line 1).** It has a clear name, does one job and gets reused in two places. Then you passed it straight into `every` (`numbers.every(isValidNumber)`) instead of wrapping it in `(n) => isValidNumber(n)`. That shows you understand functions are values you can hand around.
- **`!Number.isNaN(n)`.** `typeof NaN === "number"` is a famous JavaScript quirk ("Not a Number" is a number 🙃). The tests never check for it, and you guarded against it anyway.
- **Closure use in `addToA`.** The arrow function "remembers" `a` after `addTogether` has finished running. Think of it like a pre-loaded camera preset: you dial in setting A once, and every later shot just needs setting B. That memory is a **closure**, which is the engine underneath currying.
- **Using the rest parameter `...args`.** It's the modern replacement for the old `arguments` object, and it gives you a real array.

---

### Look ahead (optional)

Your reuse trick, where the full call goes through the curried one, is the core idea behind a general `curry()` helper. Libraries like Lodash and Ramda provide one that turns *any* function into this style. You'll see it again when you read other people's functional-style code, and now you'll recognize what it's doing.

Great work on this one, Gaf! The "two arguments still go through currying" insight is exactly the kind of thinking that makes code easier to maintain. 🚀
