export function getNewArrayWithoutFirstMatching(array, pattern) {
  const newArray = array.slice();
  const index = newArray.findIndex(pattern);
  if (index >= 0) newArray.splice(index, 1);
  return newArray;
}
