class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNodes(nbrNodesLeft) {
  nbrNodesLeft--;
  if (nbrNodesLeft > 0)
    return new Node(
      getRandomIntInclusive(-10000, 10000),
      generateNodes(nbrNodesLeft),
      generateNodes(nbrNodesLeft)
    );
  else if (nbrNodesLeft === 0)
    return new Node(getRandomIntInclusive(-10000, 10000));
}

function generateTree(length, cb) {
  if (!cb) return;
  if (typeof length !== "number")
    return cb(
      new Error(`length value must be an Integer and not a ${typeof length}.`)
    );
  if (!Number.isInteger(length))
    return cb(new Error("length must be an Integer."));
  if (length < 1)
    return cb(new Error("length must be an integer greather than 1."));
  return cb(undefined, generateNodes(length));
}

function getMax(node) {
  if (!(node instanceof Node))
    throw new Error(`node must be a Node and not a ${typeof node}.`);
  if (typeof node.value !== "number")
    throw new Error(
      `node value must be an Integer and not a ${typeof node.value}.`
    );
  if (!Number.isInteger(node.value))
    throw new Error(`node value must be an Integer.`);

  const valuesToCompare = [node.value];
  if (node.left) valuesToCompare.push(getMax(node.left));
  if (node.right) valuesToCompare.push(getMax(node.right));
  return Math.max(...valuesToCompare);
}

module.exports = {
  Node,
  generateTree,
  generateNodes,
  getMax
};
