console.log("— Implement a Stack —\n");

function initStack() {
  return { collection: [] };
}

function push(stack, element) {
  return stack?.collection?.push(element);
}

function pop(stack) {
  return stack?.collection?.pop();
}

function peek(stack) {
  return Array.isArray(stack?.collection) 
    ? stack.collection[stack.collection.length - 1] 
    : undefined
  ;
}

function isEmpty(stack) {
  return Array.isArray(stack?.collection)
    ? stack.collection.length === 0
    : undefined;
}

function clear(stack) {
  stack?.collection?.length
    ? stack.collection.length = 0
    : undefined;
}

const myStack = initStack();
console.log("myStack:", myStack, "\n");

console.log("pushing an element...");
console.log("myStack length becomes:", push(myStack, "bolo"));
console.log("myStack:", myStack, "\n");

console.log("pushing an element...");
console.log("myStack length becomes:", push(myStack, "bili"));
console.log("myStack:", myStack, "\n");

console.log("pushing an element...");
console.log("myStack length becomes:", push(myStack, "bulu"));
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

console.log("// Robustness check on a fake stack\n");

const fakeStack = { type: "fake stack" }

console.log("pushing to a fake stack:", push(fakeStack, "bolo"));
console.log("fakeStack:", fakeStack, "\n");

console.log("trying pop on a fake stack:", pop(fakeStack));
console.log("fakeStack:", fakeStack, "\n");

console.log("peeking into a fake stack:", peek(fakeStack));
console.log("fakeStack:", fakeStack, "\n");

console.log("isEmpty on a fake stack:", isEmpty(fakeStack));
console.log("fakeStack:", fakeStack, "\n");

console.log("clear on a fake stack:", clear(fakeStack));
console.log("fakeStack:", fakeStack, "\n");

