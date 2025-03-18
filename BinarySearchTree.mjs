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

  return {
    buildTree,
    prettyPrint,
  };
}
const test = tree();
// console.log(test.buildTree([8, 7, 2, 1, 5, 3, 6, 9, 4, 5, 3, 9]));
// test.buildTree([5, 3, 4, 2, 9, 6, 2, 4, 5, 2]);
test.prettyPrint(test.buildTree([8, 7, 2, 1, 5, 3, 6, 9, 4, 5, 3, 9]));
