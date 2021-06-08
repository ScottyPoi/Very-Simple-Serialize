import { useEffect, useState } from "react";
import { DisplayVector } from "../display/DisplayVector";
import * as BooleanType from "../../ssz/src/types/basic/boolean";
import * as NumberUintType from "../../ssz/src/types/basic/NumberUintType";
import * as BigIntUintType from "../../ssz/src/types/basic/BigIntUintType";
// import * as Array from '../../ssz/src/types/composite/array';
export default function VectorControls(props) {
  const [elementType, setElementType] = useState("Uint8");
  const [length, setLength] = useState(1);
  const [values, setValues] = useState([0]);
  const [maxValue, setMaxValue] = useState(255);
  const [serialized, setSerialized] = useState([]);
  const [numChunks, setNumChunks] = useState(1);
  const [size, setSize] = useState(8);
  const [valuesPerChunk, setValuesPerChunk] = useState(32);
  const [serializer, setSerializer] = useState(NumberUintType);

  const [valueSet, setValueSet] = useState([]);

 

  useEffect(() => {
    setNumChunks(Math.floor(length / valuesPerChunk + 1));
    setValues(valueSet.slice(0, length));
  }, [length, elementType]);

  useEffect(() => {
    _serialize(values);
  }, [values]);

  function getLength() {
    return length;
  }

  function getSize() {
    return size;
  }

  function getElementType() {
    return elementType;
  }

  function handleTypeChange(type) {
    let mv = 0;
    let sz = 0;
    let vpc = 0;

    if (type === "Uint8") {
      mv = 255;
      sz = 8;
      vpc = 32;
    } else if (type === "Uint16") {
      mv = 2 ** 16 - 1;
      sz = 16;
      vpc = 16;
    } else if (type === "Uint32") {
      mv = 2 ** 32 - 1;
      sz = 32;
      vpc = 8;
    } else if (type === "Uint64") {
      mv = 2 ** 64 - 1;
      sz = 64;
      vpc = 4;
    } else if (type === "Uint128") {
      mv = 2 ** 128 - 1;
      sz = 128;
      vpc = 2;
    } else if (type === "Uint256") {
      mv = 2 ** 256 - 1;
      sz = 256;
      vpc = 1;
    }
    let valueSet = [];
    for (let i = 0; i < 16*vpc; i++) {
      let val = Math.floor(Math.random() * mv);
      valueSet.push(val);
    }
    setValueSet(valueSet);
    setMaxValue(mv);
    setSize(sz);
    setValuesPerChunk(vpc);
    setElementType(type)
  }

  function _serialize(vector) {
    let _chunks = [];
    let offset = size / 8 - 1;
    for (let c = 0; c < numChunks; c++) {
      let output = new Uint8Array(32);
      for (let i = 0; i < 32; i++) {
        output = NumberUintType.serialize(
          vector[c * valuesPerChunk + i],
          output,
          i * (size / 8),
          size
        );
      }
      if (c + 1 == numChunks) {
        output = NumberUintType.serialize(
          1,
          output,
          (vector.length * (size / 8) + offset) % (valuesPerChunk * (size / 8)),
          size
        );
      }

      _chunks.push(output);
    }

    setSerialized(_chunks);
  }

  return (
    <>
      <div>VectorControls</div>
      <div>Element Type:</div>
      <select
        className="form-select"
        aria-label="Select ElementType"
        onChange={(e) => handleTypeChange(e.target.value)}
      >
        <option selected>Uint8</option>
        <option value="Uint16">Uint16</option>
        <option value="Uint32">Uint32</option>
        <option value="Uint64">Uint64</option>
        <option value="Uint128">Uint128</option>
        <option value="Uint256">Uint256</option>
      </select>
      <div>Length: {length}</div>
      <input
        value={length}
        type="number"
        min={1}
        max={maxValue}
        onChange={(e) => setLength(e.target.value)}
      />
      <br />
      <br />
      <DisplayVector
        serialized={serialized}
        values={values}
        length={length}
        type={elementType}
        size={size}
      >
        {props.children}
      </DisplayVector>
    </>
  );
}
