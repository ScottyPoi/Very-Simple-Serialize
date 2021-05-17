import VectorType from "./VectorType";
import Node from "../../Node";
import subtreeFillToLength from "../../subtreeFillToLength";
import Tree from "../../Tree";
import ZeroNode from "../../ZeroNode";
import { useState } from 'react';
import { deserializeUintFromBytes, serializeUintToBytes } from '../../math/UintMath';




export default function BasicVectorType({ ...props }) {
  const [defaultNode, setDefaultNode] = useState(null);
  const values = props.values;
  const elementType = props.elementType;
  const _byteLength = props.byteLength;
  const _length = props.length;
  const children = props.children;
  const uintType = props.uintType;
  const defaultValue = () => {
    return Array.from({ length: length }, () => {
      return defaultValue();
    });
  };

  const getVecorLength = () => {
    return length;
  };

  const getSerializedElementLength = () => {
    return _byteLength;
  };

  const getSerializedVectorLength = () => {
    return _byteLength * length;
  };

  const serializeBasicVectorToBytes = (vector, output) => {
    let byteLength = _byteLength;
    let serialized = new Uint8Array(32)
    serialized = Uint8Array.from(output);
    for (let i=0; i<vector.length; i++) {
      serialized = serializeUintToBytes(vector[i], 32, serialized, i*byteLength)
    }
    
    return serialized
  }

  const bytesValidate = (data, start, end) => {
    children.bytesValidate(data, start, end);
    if (end - start !== size(null)) {
      throw new Error("Incorrect deserialized vector length!!");
    }
  };

  // const deserializeFromBytes = (data, start, end) => {
  //   // bytes_validate(data, start, end);
  //   const length = end - start;
  //   if (length !== data.length) {
  //     throw new Error(`Invalid deserialized vector length: expected ${data.length}, actual: ${length}`);
  //   }
  //   const value = new Uint8Array(length);
  //   value.set(data.slice(start, end));
  //   return value;
  // }
  
  const deserializeBasicVectorFromBytes = (serialized) => {
    let data = new Uint8Array(32);
    data = Uint8Array.from(serialized)
    let length = _length;
    let elementSize = _byteLength;
    let output = [];
    for (let i=0; i<length; i++) {
      let isInf = true;
      let deserialized = deserializeUintFromBytes(data.slice([i*4, i*4+elementSize]), i*4, elementSize)
      output.push(deserialized);
      }
    return output
    }


  // const deserializeFromBytes = (data, start, end) => {
  //   bytesValidate(data, start, end);
  //   return children.deserializeFromBytes(data, start, end);
  // };

  // const assertValidValue = (value) => {
  //   const actualLength = value.length;
  //   const expectedLength = getLength();
  //   if (actualLength !== expectedLength) {
  //     throw new Error(
  //       `Invalid vector length: expected ${expectedLength}, actual ${actualLength}`
  //     );
  //   }
  //   children.assertValidValue(value);
  // };

  // const convertFromJson = (data) => {
  //   if (!Array.isArray(data)) {
  //     throw new Error("Invalid JSON vector: expected an Array");
  //   }
  //   const expectedLength = length;
  //   if (data.length !== expectedLength) {
  //     throw new Error(
  //       `Invalid JSON vector length: expected ${expectedLength}, actual ${data.length}`
  //     );
  //   }
  //   return children.fromJson(data);
  // };

  // const treeDefaultNode = () => {
  //   if (!defaultNode) {
  //     setDefaultNode(
  //       subtreeFillToLength(zeroNode(0), getChunkDepth(), getMaxChunkCount())
  //     );
  //   }
  //   return defaultNode;
  // };

  // const treeDefaultValue = () => {
  //   return <Tree defaultNode={defaultNode} />;
  // };

  // const treeGetLength = (target) => {
  //   return length;
  // };

  // const treeDeserializeFromBytes = (data, start, end) => {
  //   if (end - start !== getSerializedLength(null)) {
  //     throw new Error("Incorrect deserialized vector length");
  //   }
  //   return children.treeDeserializeFromBytes(data, start, end);
  // };

  // const treeSetProperty = (target, property, value) => {
  //   if (property >= treeGetLength(target)) {
  //     throw new Error("Invalid array index");
  //   }
  //   return children.treeSetProperty(target, property, value, false);
  // };

  // const hasVariableSerializedLength = () => {
  //   return false;
  // };

  // const getMaxChunkCount = () => {
  //   return Math.ceil((length * elementType.size()) / 32);
  // };

  return (
    <VectorType
      values={values}
      elementType={elementType}
      vectorType={"Basic"}
      uintType={uintType}
      elementSize={_byteLength}
      length={_length}
      serializeToBytes={serializeBasicVectorToBytes}
      deserializeFromBytes={deserializeBasicVectorFromBytes}

      // defaultNode={defaultNode}
      // defaultValue={defaultValue}
      // getMaxLength={getMaxLength}
      // getMinLength={getMinLength}
      // bytesValidate={bytesValidate}
      // deserializedFromBytes={deserializeFromBytes}
      // assertValidValue={assertValidValue}
      // convertFromJson={convertFromJson}
      // treeDefaultNode={treeDefaultNode}
      // treeDefaultValue={treeDefaultValue}
      // treeGetLength={treeGetLength}
      // treeDeserializeFromBytes={treeDeserializeFromBytes}
      // treeSetProperty={treeSetProperty}
      // getMaxChunkCount={getMaxChunkCount}
      // hasVariableSerializedLength={hasVariableSerializedLength}
    ></VectorType>
  );
}
