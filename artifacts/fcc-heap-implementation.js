// https://www.freecodecamp.org/learn/javascript-v9/lecture-understanding-graphs-and-trees-js/how-do-priority-queues-and-heaps-work
// saving this as an artifact so I can put some notes
//
// 1. the name `MinHeap` is justified because the default value of `compare` is ascending function (min-heap). the class instance can actually be just a Max-heap by supplying `(a, b) => b - a` to the constructor
// 2. It's queue(-ish?) so `peek()` is returning the tree root
// 3. instead of sorting the array data end to end, the structure relies on it being a complete binary tree (every level filled left to right, no gaps) *and* "heap property": the parent node is always equal to or less than (if Min-heap; greater than if Max-heap) its child nodes.
// 4. `push()` just push the new node first onto the arr data, then #bubbleUp to keep the "heap property"
// 5. `pop()` does the opposite: put the last node in arr data to the root position, #bubbleDown to keep the heap property, and return the top/root node that was just got replaced by the last node. plus two extra guards for when the length is 0 and 1 (oversimplified, but yeah read it and you'll understand that the second guard fires when the data originally only has 1 node)
// 5.1 additionally, `pushPop()` just does the two together at once in an efficient way: it skips the #bubbleUp process of `push()` by putting it directly at root (which is popped, so vacant spot...) and only #bubbleDown it. two work as one, more efficient than calling `push()` then `pop()`
// 6. the "niceties" we got for determining the index number relationship between parent <-> child nodes, the last parent index, the first leaf index, all comes from the how the data is structured as a **binary tree**. which means (see next points)
// 7. `heapify` only needs to fix the first part of the data, which is the "parent region", by bubbling them down to enforce the "heap property"; leaves don't have child nodes, nowhere to bubble down to. cost is O(n) — definitely more efficient than actually sorting the data (it just enforces the "heap property"). compare against other real alternative: push()-ing n items one at a time is O(n log n).
// 8. `#bubbleDown` and `#bubbleUp` selects a node, and move it up or down the tree to satisfy the heap property
// 8.1 `#bubbleUp` guard is `i > 0`, while `#bubbleDown` guard is "when there's no child/node already satisfies heap property against its children". the `l < n` and `r < n` guards are asking "does the child exist?"
// 8.2 `i` means "where the value I'm sinking/floating up currently lives." (method names according to Sedgewick's Algorithms are "sink—swim". "floating up" is just to make it easier for me to remember what "swim" is doing...)
// 9. cheat sheet:
// left child   l = 2i + 1
// right child  r = 2i + 2
// parent       p = Math.floor((i - 1) / 2)     ← note: NOT floor(i/2) - 1; it's just proven as the inverse of the `l` and `r` formulas
// last parent      Math.floor(n / 2) - 1
// first leaf       Math.floor(n / 2)           ← also = how many parents there are, since first leaf is also the "end" boundary of the parent region
// 10. on why the use of `while (true)`: #bubbleDown needs a loop to make sure that element sits where it belongs (if it proves to be smaller than a child at an iteration, it should swap place) and the end condition of the loop is "no child nodes is smaller than i", which can either be when it *doesn't have any child node that's smaller* (in the context of Min-heap) *or* i is already a leaf (no more child nodes). the condition needs the comparison which happens *inside* the loop, so `while (true)` loop is used with `break` being the exit action when the condition is met (`smallest === i` after the comparison lines, proving there is no longer any child node at all or any child node that's smaller)
class MinHeap {
  constructor(compare = (a, b) => a - b) {
    this.data = [];
    this.compare = compare;
  }

  peek() {
    return this.data[0];
  }

  push(value) {
    this.data.push(value);
    this.#bubbleUp(this.data.length - 1);
  }

  pop() {
    if (this.data.length === 0) return undefined;

    const top = this.data[0];
    const last = this.data.pop();

    if (this.data.length > 0) {
      this.data[0] = last;
      this.#bubbleDown(0);
    }

    return top;
  }

  pushPop(value) {
    if (this.data.length === 0) return value;

    if (this.compare(this.data[0], value) < 0) {
      const top = this.data[0];
      this.data[0] = value;
      this.#bubbleDown(0);
      return top;
    }

    return value;
  }

  heapify(arr) {
    this.data = arr.slice();
    for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) {
      this.#bubbleDown(i);
    }
  }

  #bubbleUp(i) {
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[p]) >= 0) break;
      [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
      i = p;
    }
  }

  #bubbleDown(i) {
    const n = this.data.length;

    while (true) {
      let smallest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      if (l < n && this.compare(this.data[l], this.data[smallest]) < 0)
        smallest = l;
      if (r < n && this.compare(this.data[r], this.data[smallest]) < 0)
        smallest = r;

      if (smallest === i) break;

      [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
      i = smallest;
    }
  }
}
