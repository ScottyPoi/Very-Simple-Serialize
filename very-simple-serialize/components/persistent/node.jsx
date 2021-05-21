import {hash} from "./hash";

const ERR_INVALID_TREE = "Invalid tree";
const ERR_NOT_IMPLEMENTED = "Not implemented";

export class Node {
  get root() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  isLeaf() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  get left() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  get right() {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  rebindLeft(left) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }

  rebindRight(right) {
    throw new Error(ERR_NOT_IMPLEMENTED);
  }
}

export class BranchNode extends Node {
   _root = null;

  constructor(_left, _right) {
    super();
    if (!_left || !_right) throw new Error(ERR_INVALID_TREE);
  }

  get root() {
    if (!this._root) {
      this._root = hash(this.left.root, this.right.root);
    }
    return this._root;
  }

  isLeaf() {
    return false;
  }

  get left() {
    return this._left;
  }

  set left(n) {
    this._left = n;
  }

  get right() {
    return this._right;
  }

  set right(n) {
    this._right = n;
  }

  rebindLeft(left) {
    return new BranchNode(left, this.right);
  }

  rebindRight(right) {
    return new BranchNode(this.left, right);
  }
}

export class LeafNode extends Node {
  constructor(_root) {
    super();
    if (_root.length !== 32) throw new Error(ERR_INVALID_TREE);
  }

  get root() {
    return this._root;
  }

  isLeaf() {
    return true;
  }
}

// setter helpers


export function identity(n) {
  return n;
}

export function compose(inner, outer) {
  return function (n) {
    return outer(inner(n));
  };
}
