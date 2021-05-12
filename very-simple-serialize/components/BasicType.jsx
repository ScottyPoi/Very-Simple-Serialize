import SSZType from './SSZType';
import { useState } from 'react';
export default function BasicType({ ...props }) {

    const value = props.value;
    const serialized = props.serialized;
    const type = props.type;
    const offset = props.offset;
    const clone = props.clone;
    const defaultValue = props.defaultValue;
  const assertValidValue = props.assertValidValue;
  const getSerializedLength = props.getSerializedLength;
  const serializeToBytes = props.serializeToBytes;
  const deserializeFromBytes = props.deserializeFromBytes

  

  const typeValidate = () => {
    return (type === "Uint") | "Boolean";
  }

  const bytesValidate = () => {
    if (!value) {
      throw new Error("Data is null or undefined");
    }
    if (value.length === 0) {
      throw new Error("Data is empty");
    }
    const length = value.length - offset;
    if (length < getSerializedLength) {
      throw new Error(
        `Data length of ${length} is too small, expect ${getSerializedLength}`
      );
    }
  }

  const hashTreeRoot = (value) => {
    let output = new Uint8Array(32);
    output = serializeToBytes(value, output, 0);
    return output
  }

  const equals = (value1, value2) => {
    assertValidValue(value1);
    assertValidValue(value2);
    return value1 === value2;
  }

  return (
    <SSZType
      value={value}
      serialized={serialized}
      offset={offset}
      type={type}
      defaultValue={defaultValue}
      equals={equals}
      serializeToBytes={serializeToBytes}
      deserializeFromBytes={deserializeFromBytes}
      typeValidate={typeValidate}
      bytesValidate={bytesValidate}
      hashTreeRoot={hashTreeRoot}
    >{props.children}</SSZType>
  );
}
