import Node from './Node';

export default function LeafNode({...props}) {

    const root = props.root
    const length = root.length;

    if (length !== 32) {
        throw new Error("Error invalid tree")
    }

    const getRoot = () => {
        return root
    }
    
    const isLeaf = () => {
        return true
    }



    return (
        <Node
        getRoot={getRoot}
        isLeaf={isLeaf}>
            {props.children}
        </Node>
    )
}