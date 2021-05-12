import { useState } from "react";
import BasicType from "./BasicType";
export default function UintNumberType({ ...props }) {
  const value = props.value;
  const offset = props.offset;
  const uintType = props.uintType;
  const byteLength = uintType === "Uint8" ? 1 : uintType === "Uint16" ? 2 : 3;

  const UintNumberTypes = ["Uint8", "Uint16", "Uint32"];

  const assertValidType = () => {
    if (!UintNumberTypes.includes(uintType)) {
      throw new Error("Type is not a Uint Number Type");
    }
  };

  const assertValidValue = (value) => {
    if (value < 0) {
      throw new Error("Uint value must be gte 0");
    }
  };

  const serializeToBytes = (value, output, offset) => {
    let array = new Uint8Array();
    array = Uint8Array.from(output);
    let val = value;
    if (byteLength > 6 && val === Infinity) {
      for (let i = offset; i < offset + byteLength; i++) {
        array[i] = 0xff;
      }
    } else {
      const MAX_BYTE = 0xff;
      for (let i = 0; i < byteLength; i++) {
        array[offset + i] = val & MAX_BYTE;
        val = Math.floor(val / 256);
      }
    }
    return array;
  };

  const deserializeFromBytes = (data, offset) => {
    let isInfinity = true;
    let output = 0;
    for (let i = 0; i < byteLength; i++) {
      output += data[offset + i] * 2 ** (8 * i);
      if (data[offset + i] !== 0xff) {
        isInfinity = false;
      }
    }
    if (byteLength > 6 && isInfinity) {
      return Infinity;
    }
    return Number(output);
  };

  const clone = () => {
    return <UintNumberType {...props} />;
  };

  return (
    <BasicType
      value={value}
      type={"Uint"}
      offset={offset}
      clone={clone}
      defaultValue={0}
      assertValidValue={assertValidValue}
      serializeToBytes={serializeToBytes}
      deserializeFromBytes={deserializeFromBytes}
    >
      {props.children}
    </BasicType>
  );
}
