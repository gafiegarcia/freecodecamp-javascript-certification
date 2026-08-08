Here, I went with "option A" (see [notes in the stack project](../lab-implement-a-stack/review-notes.md)]), just doing what was asked. so take a detour instead in the review: time/memory-space complexity and real world implementation of queue, as I noticed how `dequeue` can get expensive when n grows in this simple implementation (O(n) for `shift()`).

---

**Me:**

❯ okay just a little detour as I'm intrigued about what you said as "real world implementation" of queue; is that like linked list where head is tracked explicitly?

---

**Claude:**

Your guess is one of the two — but it's the *less* common one in practice. Let me lay out all three, because the ordering surprises people.

First, proof the problem is real, not theoretical:

```
shift()       2286.0 ms
head index       0.6 ms
            3881× faster for 200,000 dequeues
```

Same work, same result. That's what O(n) vs O(1) looks like when `n` gets real.

## 1. Head index — the cheap fix

Stop moving elements; move a pointer instead.

```js
function dequeue(queue) {
  const el = queue.collection[queue.head];
  queue.collection[queue.head++] = undefined;   // release the reference
  return el;
}
```

Nothing shifts. `head` walks forward, the tail keeps growing.

**The catch:** the array only ever gets longer. Dequeued slots at the front are dead but still allocated. Push and pop a million items over an app's lifetime and you've got a million-slot array holding six things. So you compact periodically — "when `head` passes half the length, slice off the dead prefix and reset `head` to 0."

Simple, and genuinely what a lot of JS code does when someone needs a quick queue.

## 2. Ring buffer — the actual production answer

Fixed-size array, two indices, and **the indices wrap around with `%`**. When `head` runs off the end it comes back to 0 and reuses the slots that were freed.

```js
class RingQueue {
  #slots; #head = 0; #count = 0;
  constructor(capacity = 4) { this.#slots = new Array(capacity); }

  enqueue(el) {
    if (this.#count === this.#slots.length) this.#grow();
    this.#slots[(this.#head + this.#count) % this.#slots.length] = el;
    this.#count++;
  }

  dequeue() {
    if (this.#count === 0) return undefined;
    const el = this.#slots[this.#head];
    this.#slots[this.#head] = undefined;
    this.#head = (this.#head + 1) % this.#slots.length;
    this.#count--;
    return el;
  }
}
```

```
enqueue a,b,c → dequeue a, b → enqueue d,e,f → drain: c d e f  ✅
200,000 enqueue+dequeue: 4.6 ms
```

No shifting, no dead prefix, no per-element allocation. The memory is one contiguous block that gets reused forever. This is what's inside OS kernels, audio buffers, network stacks, and every lock-free queue you'll ever read about.

Note `this.#slots[this.#head] = undefined` — without it the array keeps a reference to a dequeued object and the garbage collector can't free it. Classic subtle leak in hand-rolled queues.

## 3. Linked list — your guess, and it works

Head and tail pointers, O(1) at both ends, no capacity limit, no compaction. Textbook-clean.

**But it usually loses on real hardware, even though Big-O says it ties.** The reason is **cache locality**. Array elements sit next to each other in memory, so when the CPU fetches one it pulls in the neighbours for free and the next few reads are already there. Linked list nodes are scattered wherever the allocator put them — every `.next` is a potential trip to main memory, which is ~100× slower than cache. Plus you allocate an object per element.

So: equal on paper, array wins in practice, often by a lot. **Big-O counts operations; it doesn't know some operations are 100× more expensive than others.** That's one of the most useful corrections to a CS-textbook education, and you now have it before the Algorithms section rather than after.

## What real languages ship

- **Java `ArrayDeque`** — growable ring buffer. The docs explicitly say to prefer it over `LinkedList` for queues.
- **C++ `std::deque`** — array of fixed-size chunks.
- **Python `collections.deque`** — a doubly-linked list *of 64-element array blocks*. A hybrid: array locality inside blocks, O(1) growth by linking blocks.
- **JavaScript** — nothing built in. `Array` with `shift()` is what you get, which is exactly the trap you found.

That Python one is my favourite, because it's the real-world answer to almost every "which data structure?" question: **neither, both, chunked.** The clean textbook options are the vocabulary; production code is usually a hybrid tuned to the machine it runs on.
