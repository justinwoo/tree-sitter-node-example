const Parser = require("tree-sitter");
const Nix = require("tree-sitter-nix");

const parser = new Parser();
parser.setLanguage(Nix);

const sourceCode = `
let
  apple = if true then 123 else 456;
  banana = 456;
in apple + banana
`;

const tree = parser.parse(sourceCode);

console.log("what is the actual content?");
console.log(tree.rootNode.toString());

function nodeToObject(node) {
  return {
    type: node.type,
    childCount: node.children.length,
    children: node.children.map(x => nodeToObject(x))
  };
}

var result = nodeToObject(tree.rootNode);

console.log(JSON.stringify(result, 0, 2));

// {
//   "type": "expression",
//   "childCount": 1,
//   "children": [
//     {
//       "type": "let",           // let-in expression
//       "childCount": 4,
//       "children": [
//         {
//           "type": "let",       // let literal
//           "childCount": 0,
//           "children": []
//         },
//         {
//           "type": "binds",
//           "childCount": 2,
//           "children": [
//             {
//               "type": "bind",
//               "childCount": 4,
//               "children": [
//                 {
//                   // ... continued

module.exports = tree;
