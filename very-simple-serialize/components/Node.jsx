export default function Node({...props}) {

    const getRoot = props.getRoot;
    const isLeaf = props.isLeaf;
    const getLeft = props.getLeft;
    const getRight = props.getRight;
    const rebindLeft = props.rebindLeft;
    const rebindRight = props.rebindRight;

    return (
        <div
        getRoot={getRoot}
        isLeaf={isLeaf}
        getLeft={getLeft}
        getRight={getRight}
        rebindLeft={rebindLeft}
        rebindRight={rebindRight}>
            {props.children}
        </div>
    )
}