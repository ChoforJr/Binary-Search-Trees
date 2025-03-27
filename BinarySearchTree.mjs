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

    // Find the middle element
    let mid = start + Math.floor((end - start) / 2);

    // Create root node
    let root = node(arr[mid]);

    // Create left subtree
    root.left = createBST(arr, start, mid - 1);

    // Create right subtree
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

  return {
    buildTree,
    printroot,
    insert,
    deleteItem,
    find,
    levelOrder,
    inOrder,
    preOrder,
  };
}
const test = tree();
test.buildTree([8, 7, 2, 1, 5, 3, 6, 9, 4, 5, 3, 9]);
test.printroot();
// test.levelOrder();
// test.inOrder();
test.preOrder();
