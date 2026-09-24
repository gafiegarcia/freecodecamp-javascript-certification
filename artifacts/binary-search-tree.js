// Claude wrote the two classes, constructors, and `insert()` method
// Now I'm given the challenge to add to this...

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

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

  contains(value) {
    let current = this.root;
    while (current !== null && current.value !== value) {
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return current !== null;
  }

  inOrder() {
    // this used to be `sorted`, which is true, since in-order on a BST does visit things in an ascending order, which when printed as it goes, will produce a sorted list. but `values` pairs nicely with `collect`
    const values = [];
    const collect = (node) => {
      // improvising here, so this base case works even when Node constructor uses `undefined` instead of `null`. will delete this comment later
      if (!node) return;

      collect(node.left);
      values.push(node.value);
      collect(node.right);
    };

    collect(this.root);
    return values;
  }
}

//     8
//    / \
//   3   10
//  / \    \
// 1   6    14

const bst = new BinarySearchTree();
const input = [8, 3, 10, 1, 6, 14];
input.forEach((n) => bst.insert(n));
console.log(bst.inOrder());
