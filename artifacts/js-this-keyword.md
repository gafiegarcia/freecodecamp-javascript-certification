# JS `this` Keyword

## The idea

A method is a **script**, and `this` is **"me"** in that script. Everyone shares the same script, and "me" is whoever is reading it aloud.

`this` is **never the function itself**. It's the object the function is working on.

## Who decides `this`?

| | Who decides `this`? |
|---|---|
| **Called with `new`** (`new Counter(5)`) | **`new` itself.** It builds a brand-new empty object, runs the constructor with `this` = that object, then returns it. |
| **Regular function** (including class methods) | **The call.** Whatever is left of the dot *when it's called*. Nothing left of the dot? `undefined`.* |
| **Arrow function** | **Where it was written.** It uses the `this` of the function it sits inside. How you call it doesn't matter. |

\* Inside classes (and modules / `"use strict"`). In a plain old script, it's the global object instead. Either way, it's not what you wanted.

## Examples

```js
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  inOrder() {                       // class method = regular function
    const values = [];
    const collect = (node) => {     // arrow: uses inOrder's `this`
      if (!node) return;
      collect(node.left);
      values.push(node.value);
      collect(node.right);
    };
    collect(this.root);
    return values;
  }
}

const bst = new BinarySearchTree();

bst.inOrder();              // `this` = bst ✅ (bst is left of the dot)

const detached = bst.inOrder;
detached();                 // `this` = undefined 💥 TypeError: Cannot read properties of undefined (reading 'root')
```

If `collect` were a regular `function` **and** used `this` inside, it would break: it's called as `collect(node)`, with nothing left of the dot.

## Variables ≠ `this`

Reaching outer **variables** (like `values` above) works the same in regular and arrow functions. Only `this` behaves differently.

## Quiz

```js
const obj = {
  name: "Gaf",
  regular() { return this.name; },
  arrowInside() {
    const inner = () => this.name;
    return inner();
  },
  regularInside() {
    function inner() { return this; }
    return inner();
  },
};

obj.regular()        // → ? -> "Gaf"
obj.arrowInside()    // → ? -> "Gaf"
obj.regularInside()  // → ? (assume strict mode) -> `undefined`
const r = obj.regular;
r()                  // → ? (assume strict mode) -> TypeError (no caller to the left of dot, `this` is `undefined`, so the `regular()` function is trying to access `undefined.name`)
```

## Rule of thumb

- Methods: regular (class method syntax). `this` = the object before the dot.
- Helpers *inside* a method: arrow functions, so they share the method's `this`.
- Passing a method somewhere to be called later (`detached`, callbacks) loses its `this`.
