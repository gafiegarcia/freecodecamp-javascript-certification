// add `export default` and change to .mjs if I want this to be a module
class Queue {
  // Dequeue moves #head forward instead of shifting, so it stays O(1).
  // #compact reclaims the dead space once it exceeds half the array.
  // It's proportional, so the cost averages out to O(1) per dequeue.
  #head = 0;
  #items = [];

  // private statics can't be reached by subclasses, so class BigQueue extends Queue { } has no way to use a different threshold.
  // so it's not tunable by subclasses
  static #compactionThreshold = 1 / 2;

  get size() {
    return this.#items.length - this.#head;
  }

  inspect() {
    return {
      head: this.#head,
      size: this.size,
      items: [...this.#items],
    };
  }

  toString() {
    return `Queue(${this.toArray().join(", ")})`;
  }

  toArray() {
    return this.#items.slice(this.#head);
  }

  [Symbol.iterator]() {
    return this.toArray()[Symbol.iterator]();
  }

  peek() {
    return this.#items[this.#head];
  }

  enqueue(...items) {
    this.#items.push(...items);
    return this.size;
  }

  dequeue() {
    // mimicking how Array's pop and shift return undefined when empty
    if (this.size === 0) return;

    const front = this.#items[this.#head++];
    this.#compact();

    return front;
  }

  #compact() {
    if (this.#head > this.#items.length * Queue.#compactionThreshold) {
      this.#items.splice(0, this.#head);
      this.#head = 0;
    }
  }

  // TODO: `isEmpty()` and `clear()` usually exist
}

const myQueue = new Queue();

console.log(myQueue.inspect());
console.log(`${myQueue}`);
console.log(myQueue.peek());
console.log(myQueue.dequeue());
console.log(myQueue.enqueue("first item", "sneaky item"));
console.log(myQueue.enqueue("second item"));
console.log(myQueue.enqueue("third item"));
console.log(myQueue.enqueue("fourth item"));
for (const item of myQueue) {
  console.log(item);
}
console.log(myQueue.inspect());
console.log(`${myQueue}`);
console.log(myQueue.toArray());
console.log(myQueue.peek()); // 'first item'
console.log(myQueue.dequeue()); // 'first item'
console.log(myQueue.inspect());
console.log(myQueue.peek()); // 'sneaky item'
console.log(myQueue.dequeue()); // 'sneaky item'
console.log(myQueue.inspect());
console.log(myQueue.dequeue()); // 'second item'
console.log(myQueue.inspect());
console.log(myQueue.dequeue());
console.log(myQueue.inspect());
console.log(`${myQueue}`);
