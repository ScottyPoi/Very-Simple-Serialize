import {BranchNode, LeafNode, Node} from "./node";

const zeroes = [new LeafNode(new Uint8Array(32))];

export function zeroNode(depth) {
  if (depth >= zeroes.length) {
    for (let i = zeroes.length; i <= depth; i++) {
      zeroes[i] = new BranchNode(zeroes[i - 1], zeroes[i - 1]);
    }
  }
  return zeroes[depth];
}
