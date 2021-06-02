import CompositeType from './CompositeType';

export default function TreeValue({...props}) {

    const type = props.type;
    const tree = props.tree;
    const keys = props.keys;
    const entries = props.entries;
    const readonlyValues = props.readonlyValues;
    const readonlyEntries = props.readOnlyEntries;
    const values = props.values;
    const treeClone = props.clone;
    const treeConvertToStruct = props.treeConvertToStruct;
    const treeGetPropertyNames = props.treeGetPropertyNames;
    const treeCreateProof = props.treeCreateProof;
    const treeSerializeToBytes = props.treeSerializeToBytes;
    const treeGetSerializedLength = props.treeGetSerializedLength;
    const treeConvertToStruct = props.treeConvertToStruct;
    const structEquals = props.structEquals;
    const byteArrayEquals = props.byteArrayEquals;
    const isTree = props.isTree;
    const isListType = props.isListType;
    const isBasicType = props.isBasicType;
    const isVectorType = props.isVectorType;
    const isContainerType = props.isContainerType;
    const treeGetProperty = props.treeGetProperty;
    const treeGetPropertyNames = props.treeGetPropertyNames;
    
    return (
        <CompositeValue
        isTreeBacked={isTreeBacked}
        createTreeBacked={createTreeBacked}
        getTreeValueClass={getTreeValueClass}
        proxyWrapTreeValue={proxyWrapTreeValue}
        treeProxyHandlre={treeProxyHandler}
        clone={clone}
        valueOf={valueOf}
        equals={equals}
        size={size}
        toStruct={toStruct}
        toBytes={toBytes}
        serialize={serialze}
        hashTreeRoot={hashTreeRoot}
        createProof={createProof}
        getPropertyNames={getPropertyNames}
        values={values}
        >
            {props.children}
        </CompositeValue>
    )



    

    const isTreeBacked = (value) => {
        return value && value.type && value.tree && isTree(value.tree);
    }

    const createTreeBacked = (type, tree) => {
        const TreeValueClass = getTreeValueClass(type);
        return proxyWrapTreeValue(<TreeValueClass type={type} tree={tree}/>)

    }

    const getTreeValueClass = (type) => {
        if (isListType(type)) {
            if (isBasicType(type.elementType)) {
              return (BasicListTreeValue);
            } else {
              return (CompositeListTreeValue);
            }
          } else if (isVectorType(type)) {
            if (isBasicType(type.elementType)) {
              return (BasicArrayTreeValue);
            } else {
              return (CompositeArrayTreeValue);
            }
          } else if (isContainerType(type)) {
            return (ContainerTreeValue);
          }
    }

    const proxyWrapTreeValue = (value) => {
        return (new Proxy(value, treeProxyHandler))
    };

    const treeProxyHandler = {
        get(target, property) {
            if (property in target) {
                return target[property]
            } else {
                return target.getProperty(property)
            }
        },
        set(target, property, value) {
            return target.setProperty(property, value)
        },
        ownKeys(target) {
            return target.getPropertyNames();
        },
        getOwnPropertyDescription(target, property) {
            if (target.type.getPropertyType(property)) {
                return {
                    configurable: true,
                    enumerable: true,
                    writable: true,
                };
            } else {
                return undefined;
            }
        },
    };



    const clone = () => {
        const treeValueClass = <TreeValue {...props} />
        return proxyWrapTreeValue(<treeValueClass type={type} tree={treeClone}/>)
    }   

    const valueOf = () => {
        return treeConvertToStruct(tree)
    }

    const equals = (other) => {
        if (isTreeBacked(other)) {
            return byteArrayEquals(hashTreeRoot(), other.hashTreeRoot())
        } else {
            return structEquals(<TreeValue {...props}/>)
        }
    }

    const size = () => {
        return treeGetSerializedLength(tree)
    }

    const toStruct = () => {
        return treeConvertToStruct(tree)
    };

    const toBytes = () => {
        return treeSerializeToBytes(tree)
    }

    const serialize = () => {
        const output = new Uint8Array(treeGetSerializedLength(tree));
        toBytes(output, 0);
        return output
    }

    const hashTreeRoot = () => {
        return tree.root;
    }

    const createProof = (paths) => {
        return treeCreateProof(tree, paths)
    }

    const getPropertyNames = () => {
        return treeGetPropertyNames(tree)
    };

    [Symbol.iterator] = () => {
        return values();
    }

}