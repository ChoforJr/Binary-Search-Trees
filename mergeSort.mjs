export function mergeSort(array) {
  if (array.length === 1) {
    return array;
  } else {
    let leftArray;
    if (array.length % 2 === 0) {
      leftArray = array.slice(0, array.length / 2);
    } else {
      leftArray = array.slice(0, array.length / 2 + 1);
    }
    let rightArray = array.slice(Math.ceil(array.length / 2));
    mergeSort(leftArray);
    mergeSort(rightArray);
    return merge(leftArray, rightArray, array);
  }
}
// console.log(mergeSort([5, 3, 4, 2, 9, 6, 2]));

function merge(left, right, array) {
  let k = 0,
    i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      array[k] = left[i];
      k++;
      i++;
    } else {
      array[k] = right[j];
      k++;
      j++;
    }
  }
  while (i < left.length) {
    if (k < array.length) {
      array[k] = left[i];
      k++;
      i++;
    }
  }
  while (j < right.length) {
    if (k < array.length) {
      array[k] = right[j];
      k++;
      j++;
    }
  }
  return array;
}
// console.log(merge([3, 5, 6], [2, 4], [5, 3, 4, 2, 6]));
// console.log(merge([3, 5], [2, 4, 6], [5, 3, 4, 2, 6]));
