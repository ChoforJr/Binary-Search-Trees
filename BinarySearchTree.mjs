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
  //Write a buildTree(array) function that takes an array of data
  //(e.g., [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) and
  //turns it into a balanced binary tree full of Node objects
  //appropriately placed (don’t forget to sort and remove duplicates!).
  //The buildTree function should return the level-0 root node
  function buildTree(array) {
    //sorted Without Dublicates
    const arr = [...new Set(mergeSort(array))];

    root = createBST(arr, 0, arr.length - 1);

    return root;
  }

  //If you would like to visualize your binary search tree,
  //here is a prettyPrint() function that will console.log
  //your tree in a structured format. This function will expect
  //to receive the root of your tree as the value for the node parameter
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

  //A function that adds a value to tree
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

  //This is part of the delete function
  function min(root) {
    root = root.right;
    while (root !== null && root.left !== null) {
      root = root.left;
    }
    return root;
  }
  //This function delete a value from the tree
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

  //function that returns the node with the given value
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

  //Level Order Traversal technique is a method to traverse
  //a Tree such that all nodes present in the same level are
  //traversed completely before traversing the next level
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
    console.log("Level-Order Traversal");
    return console.log(outPut);
  }

  // (7) Write a function for InOrder, preOrder and postOrder
  //Nodes from the left subtree get visited first,
  //followed by the root node and right subtree.
  //Such a traversal visits all the nodes in the order of non-decreasing key sequence.
  function inOrderFunction(root, array) {
    if (root === null) {
      return;
    }
    inOrderFunction(root.left, array);
    array.push(root.data);
    inOrderFunction(root.right, array);
  }
  function inOrder() {
    console.log("In-Order Traversal");
    let arr = [];
    inOrderFunction(root, arr);
    return console.log(arr);
  }

  //The root node gets visited first, followed by left and right subtrees.
  function preOrderFunction(root, array) {
    if (root === null) {
      return;
    }
    array.push(root.data);
    preOrderFunction(root.left, array);
    preOrderFunction(root.right, array);
  }
  function preOrder() {
    console.log("Pre-Order Traversal");
    let arr = [];
    preOrderFunction(root, arr);
    return console.log(arr);
  }

  //Nodes from the left subtree get visited first,
  //followed by the right subtree, and finally, the root.
  function postOrderFunction(root, array) {
    if (root === null) {
      return;
    }
    postOrderFunction(root.left, array);
    postOrderFunction(root.right, array);
    array.push(root.data);
  }
  function postOrder() {
    console.log("Post-Order Traversal");
    let arr = [];
    postOrderFunction(root, arr);
    return console.log(arr);
  }

  //This is part of the hieght function
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
  //function that returns the given node’s height.
  //Height is defined as the number of edges in the longest
  //path from a given node to a leaf node
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

  //function that returns the given node’s depth.
  //Depth is defined as the number of edges in the path
  //from a given node to the tree’s root node
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

  //function that checks if the tree is balanced.
  //A balanced tree is one where the difference between
  //heights of the left subtree and the right subtree of
  //every node is not more than 1
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

  //This i spart of the rebalance function
  function nodeToArray(root, array) {
    if (root === null) {
      return;
    }
    nodeToArray(root.left, array);
    array.push(root.data);
    nodeToArray(root.right, array);
  }
  //function that rebalances an unbalanced tree
  function rebalance() {
    let arr = [];
    nodeToArray(root, arr);
    return buildTree(arr);
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
    rebalance,
  };
}
const test = tree();
test.buildTree([1, 3, 32, 12, 77, 3, 55, 14, 90, 44, 26, 85]);
test.printroot();
console.log(test.isBalanced());
test.levelOrder();
test.inOrder();
test.preOrder();
test.postOrder();
test.insert(111);
test.insert(102);
test.insert(150);
test.insert(350);
test.insert(278);
test.printroot();
console.log(test.isBalanced());
test.rebalance();
test.printroot();
console.log(test.isBalanced());
test.levelOrder();
test.inOrder();
test.preOrder();
test.postOrder();
