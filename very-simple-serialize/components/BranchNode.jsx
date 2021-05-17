import Node from './Node';
import {useState} from 'node';

export default function BranchNode({...props, ...children}) {

    const root = props.root;
    const [left, setLeft] = useState(props.left);
    const [right, setRight] = useState(props.right);

    if (!left || !right) {
        throw new Error("Error Invalid Tree")
    };

    const getRoot = () => {
        return root;
    }

    const isLeaf = () => {
        return false
    };

    const getLeft = () => {
        return left
    }

    const getRight = () => {
        return right
    };

    const rebindLeft = (l) => {
        return (
            <BranchNode 
                left={l}
                right={right}
            />
        )
    }

    const rebindRight = (r) => {
        return (
            <BranchNode
                left={left}
                right={r}
                />
        )
    }



    return (
        <Node
        getRoot={getRoot}
        isLeaf={isLeaf}
        getLeft={getLeft}
        getRight={getRight}
        rebindLeft={rebindLeft}
        rebindRight={rebindRight}>
            {children}
        </Node>
    )
}