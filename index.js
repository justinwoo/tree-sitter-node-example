const Parser = require("tree-sitter");
const Nix = require("tree-sitter-nix");

const parser = new Parser();
parser.setLanguage(Nix);

const sourceCode = `
let
  apple = if true then 123 else 456;
  banana = 456;
in {
  inherit apple banana;
}
`;

const tree = parser.parse(sourceCode);

console.log("what is the actual content?");
console.log(tree.rootNode.toString());

function nodeToObject(node) {
  const namedChildren = node.children.filter(x => x.isNamed);
  return {
    type: node.type,
    // rawChildCount: node.children.length,
    // rawChildren: node.children.map(x => nodeToObject(x)),
    childCount: namedChildren.length,
    children: namedChildren.map(x => nodeToObject(x))
  };
}

var result = nodeToObject(tree.rootNode);

console.log(JSON.stringify(result, 0, 2));

module.exports = {
  tree,
  result
};
