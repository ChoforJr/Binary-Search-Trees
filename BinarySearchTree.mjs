import { mergeSort } from "./mergeSort.mjs";

const node = (data, left = null, right = null) => {
  return {
    data,
    left,
    right,
  };
};

function tree() {
  let root = null;

  function createBST(arr, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);

    let root = node(arr[mid]);

    root.left = createBST(arr, start, mid - 1);

    root.right = createBST(arr, mid + 1, end);

    return root;
  }

  function buildTree(array) {
    //sorted Without Dublicates
    const arr = [...new Set(mergeSort(array))];

    root = createBST(arr, 0, arr.length - 1);

    return root;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  function printroot() {
    prettyPrint(root);
  }

  function insert(value) {
    let rootent = root;
    let previous;
    while (rootent) {
      previous = rootent;
      if (rootent.data === value) {
        return console.log("Already Exist");
      } else if (rootent.data > value) {
        rootent = rootent.left;
      } else {
        rootent = rootent.right;
      }
    }
    if (previous.data > value) {
      previous.left = node(value);
    } else {
      previous.right = node(value);
    }
  }

  function min(root) {
    root = root.right;
    while (root !== null && root.left !== null) {
      root = root.left;
    }
    return root;
  }
  function deleteNode(root, value) {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = deleteNode(root.left, value);
    } else if (value > root.data) {
      root.right = deleteNode(root.right, value);
    } else {
      //case 1: No child
      if (root.left === null && root.right === null) {
        return null;
      }
      //case 2: One child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }
      //case 3: Two children
      let succ = min(root);
      root.data = succ.data;
      root.right = deleteNode(root.right, root.data);
    }
    return root;
  }
  function deleteItem(value) {
    root = deleteNode(root, value);
  }

  function find(value) {
    let current = root;
    let previous;
    if (current === null) {
      return console.log("Not Found");
    }
    while (current) {
      previous = current;
      if (value === current.data) {
        return prettyPrint(current);
      } else if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      }
    }
    return console.log("Not Found");
  }

  function levelOrder() {
    if (root === null) return console.log("Empty");
    let queue = [root];
    let outPut = [];
    let current;
    while (queue.length > 0) {
      current = queue[0];
      outPut.push(current.data);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      queue.shift();
    }
    return console.log(outPut);
  }

  // (7) Write a function for InOrder, preOrder and postOrder
  //Nodes from the left subtree get visited first,
  //followed by the root node and right subtree.
  //Such a traversal visits all the nodes in the order of non-decreasing key sequence.
  function inOrderFunction(root) {
    if (root === null) {
      return;
    }
    inOrderFunction(root.left);
    console.log(root.data);
    inOrderFunction(root.right);
  }
  function inOrder() {
    return inOrderFunction(root);
  }

  //The root node gets visited first, followed by left and right subtrees.
  function preOrderFunction(root) {
    if (root === null) {
      return;
    }
    console.log(root.data);
    preOrderFunction(root.left);
    preOrderFunction(root.right);
  }
  function preOrder() {
    return preOrderFunction(root);
  }

  //Nodes from the left subtree get visited first,
  //followed by the right subtree, and finally, the root.
  function postOrderFunction(root) {
    if (root === null) {
      return;
    }
    postOrderFunction(root.left);
    postOrderFunction(root.right);
    console.log(root.data);
  }
  function postOrder() {
    return postOrderFunction(root);
  }

  function max(a, b) {
    if (a > b) {
      return a;
    } else if (a < b) {
      return b;
    } else {
      return a;
    }
  }
  function heightFunction(node) {
    if (node === null) return -1;
    return max(heightFunction(node.left), heightFunction(node.right)) + 1;
  }
  function height(value) {
    let current = root;
    let previous;
    if (current === null) return;
    while (current) {
      previous = current;
      if (value === current.data) {
        break;
      } else if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      }
    }
    return heightFunction(current);
  }

  function depth(value) {
    let current = root;
    let counter = 0;
    if (current.data === value) {
      return 0;
    }
    while (current) {
      if (value === current.data) {
        break;
      } else if (value < current.data) {
        counter++;
        current = current.left;
      } else if (value > current.data) {
        counter++;
        current = current.right;
      }
    }
    return counter;
  }

  function isBalanced() {
    if (root === null) return console.log("Tree is Empty");
    let left = height(root.left.data);
    let right = height(root.right.data);
    let difference = Math.abs(left - right);
    if (difference <= 1) {
      return true;
    } else {
      return false;
    }
  }

  return {
    buildTree,
    printroot,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
  };
}
const test = tree();
test.buildTree([8, 7, 2, 1, 5, 3, 6, 9, 4, 5, 3, 9]);
test.printroot();
console.log(test.isBalanced());
