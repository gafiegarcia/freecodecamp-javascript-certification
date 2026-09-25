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

  static compare(a, b) {           // STATIC METHOD
    return a.value - b.value;
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
| **Static field** | `static created = 0;` | `Counter.created` (the class, not `c`) | ❌ one copy, stored on the class itself |

**Quirks**

- **Public field vs. constructor property:** the result is the same. Both create a normal property on each instance. "Field" names how it's *written*, and "instance property" names what ends up on the *object*, so `step` is both: a field that becomes an instance property.
  - A field declares the property **up top**, so readers see the object's "shape" at a glance. It works when the starting value is always the same. It's a style choice, not a rule: for a tiny class that already needs a constructor, keeping everything in the constructor is just as readable.
  - Written without `this.`: `left = null;`, not `this.left = null;`. The class body is a **list of member definitions**, not code that runs line by line, and a member's name can't contain a dot → `SyntaxError: Unexpected token '.'`.
  - The **right side** of `=` *is* code that runs (during `new`), and `this` there is the new instance: `double = this.step * 2;` works.
  - The constructor is where you use **arguments**, like `start`, because a field can't see the constructor's parameters.
  - **Order:** fields are set first, then the constructor body runs. So the constructor can already read `this.step`.
- **Private fields must be declared in the body.** `this.#x = 1` in the constructor without a `#x;` line up top → `SyntaxError`.
- **`#` is part of the name.** `this.#count` and `this.count` are two unrelated things.
- **Private really means private.** `c.#count` outside the class → `SyntaxError` (not `undefined`). It doesn't show up in `console.log(c)` or `Object.keys(c)` either.
- **Static isn't on instances.** Static members live on the class itself, not on the prototype, so instances can't reach them: `c.created` → `undefined`. Use `Counter.created`.
- **No `let` / `const` / `var`** in front of fields, and **no commas** between class members (unlike object literals).

## Behavior: the "verbs"

| Member | How to write it | How to call it | `this` inside it |
|---|---|---|---|
| **Constructor** | `constructor(args) { ... }` | Automatically, by `new Counter(5)` | The new instance |
| **Method** | `increment() { ... }` | `c.increment()` | Left of the dot (regular function) |
| **Private method** | `#log() { ... }` | `this.#log()`, only inside the class | Left of the dot |
| **Getter** | `get value() { ... }` | `c.value`, **no `()`** | Left of the dot (the instance you read from) |
| **Setter** | `set value(v) { ... }` | `c.value = 3`, **assignment** | Left of the dot (the instance you assign to) |
| **Static method** | `static compare(a, b) { ... }` | `Counter.compare(a, b)` | The class itself (`Counter`) |
| **Arrow function field** | `handleClick = () => { ... };` | `c.handleClick()`, or pass it around | **Always** the instance, even when detached |

**Quirks**

- **Constructor:** only one per class, and it's optional (leave it out and JS uses an empty one). Calling the class without `new` → `TypeError: Class constructor Counter cannot be invoked without 'new'`.
- **Methods are shared.** There's one `increment` on `Counter.prototype` for every instance (getters and setters live there too). That's why `this` has to tell it *which* counter to work on.
- **Methods lose `this` when detached** (`const f = c.increment; f()` → `TypeError`). See [js-this-keyword.md](js-this-keyword.md).
- **Arrow function fields don't lose `this`**, because they're written where `this` is the instance. The cost: every instance gets its **own copy** of the function. Use them for functions you pass somewhere to be called later, like event listeners: `button.addEventListener("click", c.handleClick)`.
- **Static methods** are tools that belong to the *idea* of a Counter, not to one counter. Think of `Math.max()`: you never create a `Math` instance first.
  - The test: does it naturally work on **one** instance? Then make it a method (`c.reset()`). Does it work on **several** instances, or none? Then it's static. `compare` takes two counters, so neither one "owns" it, and it plugs straight into sorting: `counters.sort(Counter.compare)`.

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
- **A field with the same name as a getter hides it.** `value = 1;` plus `get value()` is *not* a `SyntaxError`: the field becomes an own property on the instance, and JS finds that first, so the getter on the prototype never runs. Another reason to keep names separate.

## What `new` does

`new Counter(5)` is a construction crew:

1. **Build** a brand-new empty object.
2. **Link** it to `Counter.prototype`.
3. **Install** the fields on it.
4. **Run** the constructor body with `this` = the new object.
5. **Return** the object automatically (no `return this` needed).

| Written in the class as... | During `new` |
|---|---|
| Public fields, private fields, arrow function fields | **Installed** on each instance (own copies) |
| Methods, getters, setters | **Not installed.** They stay on `Counter.prototype`, and the instance gets one **link** to it |
| Static members | **Neither.** They stay on `Counter` itself |

Because the link (2) comes before the fields (3), a field's right side can already call a method: `total = this.computeTotal();`.

## Whole-class quirks

- `typeof Counter` → `"function"`. A class is a special function underneath.
- Classes are **not hoisted** like function declarations. Using a class above the line where it's defined → `ReferenceError: Cannot access 'Counter' before initialization`.
- Class code always runs in **strict mode**, which is why a detached method gets `this = undefined`.

## Also: `extends` and `super`

```js
class StepCounter extends Counter {  // StepCounter is linked to everything Counter has
  constructor(start, step) {
    super(start);                    // run Counter's constructor first (required before using `this`)
    this.step = step;
  }
}
```

**Private members are inherited, but locked.** A `StepCounter` instance *does* have `#count` (Counter's constructor installs it during `super()`), and Counter's own methods can use it:

```js
const s = new StepCounter(0, 10);
s.increment();   // Counter's method, run on a StepCounter → "My Counter: 10"
```

But code written inside `StepCounter` can't mention `this.#count` at all, **not even to read it** → `SyntaxError`. The child goes through the parent's public doors instead:

```js
class StepCounter extends Counter {
  // ...constructor from above...
  double() {
    this.value = this.value * 2;   // getter + setter → they touch #count for us
  }
}
```

So `#count` isn't junk: it's the data behind the parent's getter, setter, and methods, and the child uses it through them.

## Where everything lives: the prototype chain

| Place | Holds |
|---|---|
| `Counter` (the class = the constructor function) | construction code, static members |
| `Counter.prototype` (the shelf) | methods, getters/setters, and `constructor` → a pointer back to `Counter` |
| `c` (the instance) | its own fields and properties |

Looking up `c.something`: check `c` itself first, then follow the links up the chain until the name is found (or the chain ends at `null`).

**`extends` makes two links**, when the class is defined. **`new` makes one more**, for each instance:

```
Classes (for statics):     StepCounter → Counter → Function.prototype → Object.prototype → null
Instances (for methods):   s → StepCounter.prototype → Counter.prototype → Object.prototype → null
                           ↑ made by `new`   ↑ made by `extends`
```

- Nothing is copied. `StepCounter.prototype` only has its own methods; `increment` is found on `Counter.prototype` through the link.
- Statics **are** inherited, by the child **class**: `StepCounter.compare` works. Instances still can't reach them.
- `Object.prototype` is where `.toString()` lives. `Function.prototype` is where `.bind()` lives.

⚠️ **"Prototype" means two things:**

- `StepCounter.prototype`: a **property**, the shelf `StepCounter` keeps **for its instances**.
- "StepCounter's prototype": **its own link**, `Object.getPrototypeOf(StepCounter)`, which is `Counter`.

`StepCounter.prototype === Object.getPrototypeOf(StepCounter)` → `false`.

## Private fields: the three questions

When code reaches `something.#count`, JS asks:

| Question | Decided by | Fails with |
|---|---|---|
| **1. Is this code allowed to say `#count`?** | **Where it's written**: inside the body of the class that declares `#count` (nested functions included) | `SyntaxError`, before anything runs |
| **2. Whose `#count`?** | Whatever is left of `.#count` (usually `this`, but `other.#count` works too) | – |
| **3. Does that object have the `#count` locker?** | **How it was built**: `new` on that class, or a child class via `super()` | `TypeError: Cannot read private member #count from an object whose class did not declare it` |

- Permission comes from where the code is **written**, not where the function is **stored**. A Counter method copied onto another object still passes question 1 (and fails question 3 if that object has no locker).
- Static methods written in the class pass question 1 too: `static peek(x) { return x.#count; }` works.
- This is **encapsulation**: only the owning class's code can read or change the data, so its setter's checks can't be bypassed.

## Checking what something is

| Check | Where it works | What it actually asks |
|---|---|---|
| `x instanceof Counter` | anywhere | Is `Counter.prototype` somewhere in `x`'s prototype chain? |
| `#count in x` | only inside `Counter`'s body | Does `x` have Counter's `#count` locker? (question 3) |

```js
s instanceof Counter      // true  (child instances count)
c instanceof StepCounter  // false (a parent isn't an instance of its child)

isBiggerThan(other) {
  if (!(#count in other)) return false;   // safe guard before touching other.#count
  return this.#count > other.#count;
}
```

`instanceof` can be fooled: `Object.create(Counter.prototype)` links the chain without running the constructor, so `instanceof` says `true` but there's no locker. `#count in x` can't be fooled. For everyday checks, `instanceof` is the usual choice.
