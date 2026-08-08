console.log("— Implement a Stack —\n");

function initStack() {
  return { collection: [] };
}

function assertStack(stack, caller) {
  if (!Array.isArray(stack?.collection)) {
    throw new TypeError(
      `${caller}: expected "stack.collection" to be an array, got ${typeof stack?.collection}`,
      // we can add error.cause here! Claude said it's the "modern" approach...
      { cause: "fake test", supercause: "it's a fake test" },
    );
  }
}

function push(stack, element) {
  assertStack(stack, "push");
  stack.collection.push(element);
}

function pop(stack) {
  assertStack(stack, "pop");
  return stack.collection.pop();
}

function peek(stack) {
  assertStack(stack, "peek");
  return stack.collection[stack.collection.length - 1];
}

function isEmpty(stack) {
  assertStack(stack, "isEmpty");
  return stack.collection.length === 0;
}

function clear(stack) {
  assertStack(stack, "clear");
  stack.collection.length = 0;
}

const myStack = initStack();
console.log("myStack:", myStack, "\n");

console.log("pushing an element...");
console.log("myStack:", myStack, "\n");

console.log("pushing an element...");
console.log("myStack:", myStack, "\n");

console.log("pushing an element...");
console.log("myStack:", myStack, "\n");

console.log("popping an element...");
console.log("top element of myStack was:", pop(myStack));
console.log("myStack:", myStack, "\n");

console.log("peeking top element...");
console.log("top element of myStack is:", peek(myStack));
console.log("myStack:", myStack, "\n");

console.log("myStack is empty:", isEmpty(myStack), "\n");

console.log("clearing myStack...");
clear(myStack);
console.log("myStack:", myStack, "\n");

console.log("myStack is empty:", isEmpty(myStack), "\n");

// robustness demo from Claude
function tryIt(label, fn) {
  try {
    console.log(label, "→", fn());
  } catch (error) {
    // console.error(label, "→ threw", `${error}`); -> This was Claude's overengineered
    // error message; it makes this robustness easier to read though, because
    // the stack trace is hidden
    console.error(error);
  }
}

const fakeStack = { type: "fake stack" };
tryIt("push", () => push(fakeStack, "bolo"));
tryIt("pop", () => pop(fakeStack));
tryIt("peek", () => peek(fakeStack));
tryIt("isEmpty", () => isEmpty(fakeStack));
tryIt("clear", () => clear(fakeStack));
