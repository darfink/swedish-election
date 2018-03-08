export function findMaxIndex(array) {
  let len = array.length;
  let max = -Infinity;
  let index = -1;

  while (len--) {
    if (array[len] > max) {
      max = array[len];
      index = len;
    }
  }

  return index;
}
