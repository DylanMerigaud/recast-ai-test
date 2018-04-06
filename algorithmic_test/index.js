const binaryTree = require("./binaryTree");

binaryTree.generateTree(10, (err, rootNode) => {
  //console.log(rootNode);
  console.log("max:", binaryTree.getMax(rootNode));
});
