// I'll try to be real fast, no error-handling shenanigans
// Let's just assume whoever whichever calls these functions will catch errors by itself

function initQueue() {
  return {
    collection: []
  };
}

function print(queue) {
  console.log(queue.collection);
}

function enqueue(queue, element) {
  queue.collection.push(element);
}

function dequeue(queue) {
  return queue.collection.shift();
}

function front(queue) {
  return queue.collection[0]
}

function size(queue) {
  return queue.collection.length;
}

function isEmpty(queue) {
  return queue.collection.length === 0;
}