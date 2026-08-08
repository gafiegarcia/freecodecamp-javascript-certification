function initList() {
  return {
    head: null,
    length: 0
  };
}

function isEmpty(list) {
  return list.length === 0;
}

function add(list, element) {
  const node = { element, next: null };

  if (isEmpty(list)) {
    list.head = node;
  } else {
    let current = list.head;
    while (current.next !== null) {
      current = current.next;
    }
    current.next = node;
  }

  list.length++;
}

function remove(list, element) {
  let previous = null;
  let current = list.head;

  while (current !== null && current.element !== element) {
    previous = current;
    current = current.next;
  }

  if (current === null) return;

  if (previous !== null) {
    previous.next = current.next;
  } else {
    list.head = current.next;
  }

  list.length--;
}

function contains(list, element) {
  let current = list.head;

  while (current !== null && current.element !== element) {
    current = current.next;
  }

  return Boolean(current);
}

function getAt(list, index) {
  if (index >= list.length || index < 0) {
    return;
  }

  let i = 0;
  let current = list.head;

  while (i !== index) {
    current = current.next;
    i++;
  }

  return current.element;
}

function insertAt(list, index, element) {
  if (index > list.length || index < 0) {
    return;
  }

  let i = 0;
  let previous = null;
  let current = list.head;
  const node = { element };

  while (i !== index) {
    previous = current;
    current = current.next;
    i++;
  }

  if (previous !== null) {
    previous.next = node;
  } else {
    list.head = node;
  }

  node.next = current;
  list.length++;
}

function removeAt(list, index) {
  if (index >= list.length || index < 0) {
    return;
  }

  let i = 0;
  let previous = null;
  let current = list.head;

  while (i !== index) {
    previous = current;
    current = current.next;
    i++;
  }

  if (previous !== null) {
    previous.next = current.next;
  } else {
    list.head = current.next;
  }

  list.length--;
}

function clear(list) {
  list.head = null;
  list.length = 0;
}

const theList = initList();
add(theList, "bolo");
add(theList, "bili");

console.log(theList);

