# JS Class Anatomy

## Everything in one class

```js
class Counter {
  step = 1;                        // PUBLIC FIELD
  #count = 0;                      // PRIVATE FIELD
  static created = 0;              // STATIC FIELD

  constructor(start) {             // CONSTRUCTOR
    this.label = "My Counter";     // INSTANCE PROPERTY (set in the constructor)
    this.#count = start;
    Counter.created++;
  }

  increment() {                    // METHOD
    this.#count += this.step;
    this.#log();
  }

  #log() {                         // PRIVATE METHOD
    console.log(`${this.label}: ${this.#count}`);
  }

  get value() {                    // GETTER
    return this.#count;
  }

  set value(newValue) {            // SETTER
    if (newValue < 0) return;      // the bouncer: rejects bad values
    this.#count = newValue;
  }

  static reset(counter) {          // STATIC METHOD
    counter.value = 0;
  }

  handleClick = () => {            // ARROW FUNCTION FIELD
    this.increment();
  };
}

const c = new Counter(5);          // INSTANCE
```

## Data: the "nouns"

| Member | How to write it | How to use it | Each instance gets its own? |
|---|---|---|---|
| **Public field** | `step = 1;` in the class body | `c.step` | ✅ |
| **Instance property** | `this.label = ...` in the constructor | `c.label` | ✅ |
| **Private field** | `#count = 0;` in the class body | `this.#count`, **only inside the class** | ✅ |
| **Static field** | `static created = 0;` | `Counter.created` (the class, not `c`) | ❌ one shared copy |

**Quirks**

- **Public field vs. constructor property:** the result is the same. Both create a normal property on each instance.
  - A field declares the property **up top**, so readers see the object's "shape" at a glance. It works when the starting value is always the same. It's a style choice, not a rule: for a tiny class that already needs a constructor, keeping everything in the constructor is just as readable.
  - Written without `this.`: `left = null;`, not `this.left = null;` (that's a `SyntaxError` in the class body).
  - The constructor is where you use **arguments**, like `start`, because a field can't see the constructor's parameters.
  - **Order:** fields are set first, then the constructor body runs. So the constructor can already read `this.step`.
- **Private fields must be declared in the body.** `this.#x = 1` in the constructor without a `#x;` line up top → `SyntaxError`.
- **`#` is part of the name.** `this.#count` and `this.count` are two unrelated things.
- **Private really means private.** `c.#count` outside the class → `SyntaxError` (not `undefined`). It doesn't show up in `console.log(c)` or `Object.keys(c)` either.
- **Static isn't on instances.** `c.created` → `undefined`. Use `Counter.created`.
- **No `let` / `const` / `var`** in front of fields, and **no commas** between class members (unlike object literals).

## Behavior: the "verbs"

| Member | How to write it | How to call it | `this` inside it |
|---|---|---|---|
| **Constructor** | `constructor(args) { ... }` | Automatically, by `new Counter(5)` | The new instance |
| **Method** | `increment() { ... }` | `c.increment()` | Left of the dot (regular function) |
| **Private method** | `#log() { ... }` | `this.#log()`, only inside the class | Left of the dot |
| **Getter** | `get value() { ... }` | `c.value`, **no `()`** | The instance |
| **Setter** | `set value(v) { ... }` | `c.value = 3`, **assignment** | The instance |
| **Static method** | `static reset(x) { ... }` | `Counter.reset(c)` | The class itself (`Counter`) |
| **Arrow function field** | `handleClick = () => { ... };` | `c.handleClick()`, or pass it around | **Always** the instance, even when detached |

**Quirks**

- **Constructor:** only one per class, and it's optional (leave it out and JS uses an empty one). Calling the class without `new` → `TypeError: Class constructor Counter cannot be invoked without 'new'`.
- **Methods are shared.** There's one `increment` on the blueprint for every instance. That's why `this` has to tell it *which* counter to work on.
- **Methods lose `this` when detached** (`const f = c.increment; f()` → `TypeError`). See [js-this-keyword.md](js-this-keyword.md).
- **Arrow function fields don't lose `this`**, because they're written where `this` is the instance. The cost: every instance gets its **own copy** of the function. Use them for functions you pass somewhere to be called later, like event listeners: `button.addEventListener("click", c.handleClick)`.
- **Static methods** are tools that belong to the *idea* of a Counter, not to one counter. Think of `Math.max()`: you never create a `Math` instance first.

## Getters & setters

A getter or setter is **a function dressed up as a property**. The user writes normal property code, and your function runs behind the scenes.

```js
c.value        // runs the getter → 5
c.value = 10   // runs the setter with newValue = 10
c.value = -3   // runs the setter → rejected by the bouncer, still 10
```

Why use them? The classic pair is **private field + getter (+ setter)**. The data stays hidden in `#count`, the getter lets people **read** it, and the setter (if you add one) checks values before letting them **in**.

- **Getter:** no parameters, must `return` something.
- **Setter:** exactly one parameter (the assigned value).
- **Getter with no setter = read-only.** `c.value = 10` is silently ignored, or throws a `TypeError` in strict mode.
- **Don't name the getter after the data it returns.** `get value() { return this.value; }` calls itself forever → `RangeError: Maximum call stack size exceeded`. That's why the data lives in `#count`.

## Whole-class quirks

- `typeof Counter` → `"function"`. A class is a special function underneath.
- Classes are **not hoisted** like function declarations. Using a class above the line where it's defined → `ReferenceError: Cannot access 'Counter' before initialization`.
- Class code always runs in **strict mode**, which is why a detached method gets `this = undefined`.

## Also: `extends` and `super`

```js
class StepCounter extends Counter {  // StepCounter gets everything Counter has
  constructor(start, step) {
    super(start);                    // run Counter's constructor first (required before using `this`)
    this.step = step;
  }
}
```

A child class can't touch the parent's `#private` members. They're private to the class that declared them.
