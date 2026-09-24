// Claude wrote the class, constructor, and `insert()` method
// Now I'm given the challenge to add to this...
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new Node(value);

    // Empty tree? The new node becomes the root.
    if (this.root === null) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        // Go left. If the left door is empty, move in.
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        // Go right. If the right door is empty, move in.
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  contains(value) {}
}
