const binaryTree = require("./binaryTree");

describe("Node", () => {
  it("works", () => {
    expect(new binaryTree.Node(1)).toEqual({
      value: 1,
      left: null,
      right: null
    });
    expect(new binaryTree.Node(1, 2)).toEqual({
      value: 1,
      left: 2,
      right: null
    });
    expect(new binaryTree.Node(1, 2, 3)).toEqual({
      value: 1,
      left: 2,
      right: 3
    });
  });
});

describe("generateTree", () => {
  it("calls cb with an error and no data when length is not valid", () => {
    const expectErrorAndNoData = length =>
      binaryTree.generateTree(length, (err, data) => {
        expect(err).toBeDefined();
        expect(data).toBeUndefined();
      });

    expectErrorAndNoData(0);
    expectErrorAndNoData("wrong");
    expectErrorAndNoData(0.1);
    expectErrorAndNoData(undefined);
  });

  it("does nothing when cb is not passed", () => {
    binaryTree.generateTree(1, undefined);
  });

  it("works", () => {
    const expectANodeWithAnIntegerAsValue = node => {
      expect(
        typeof node.value !== "number" || !Number.isInteger(node.value)
      ).toBe(false);
      if (node.left) expectANodeWithAnIntegerAsValue(node.left);
      if (node.right) expectANodeWithAnIntegerAsValue(node.right);
    };
    const expectNoErrorAndBinaryTree = length =>
      binaryTree.generateTree(length, (err, rootNode) => {
        expect(err).toBeUndefined();
        expectANodeWithAnIntegerAsValue(rootNode);
      });

    expectNoErrorAndBinaryTree(1);
    expectNoErrorAndBinaryTree(2);
  });
});

describe("getMax", () => {
  it("throw an error when the the binaryTree is not valid", () => {
    const expectGetMaxToThrow = (...args) =>
      expect(() => {
        binaryTree.getMax(...args);
      }).toThrow();

    expectGetMaxToThrow(undefined);
    expectGetMaxToThrow({ value: "wrong" });
    expectGetMaxToThrow(new binaryTree.Node("wrong"));
    expectGetMaxToThrow(new binaryTree.Node(0.1));
    expectGetMaxToThrow(new binaryTree.Node(0, "wrong"));
    expectGetMaxToThrow(
      new binaryTree.Node(0, new binaryTree.Node(0), "wrong")
    );
  });

  it("works", () => {
    expect(binaryTree.getMax(new binaryTree.Node(2))).toBe(2);
    expect(
      binaryTree.getMax(new binaryTree.Node(1, new binaryTree.Node(2)))
    ).toBe(2);
    expect(
      binaryTree.getMax(
        new binaryTree.Node(1, new binaryTree.Node(1), new binaryTree.Node(2))
      )
    ).toBe(2);
  });
});

describe("generateNodes", () => {
  it("generateNodes", () => {
    expect(binaryTree.generateNodes(0)).toBeUndefined();
  });
});
