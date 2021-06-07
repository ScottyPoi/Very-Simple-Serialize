import { useEffect, useState } from "react";
import { DisplayVector } from "../display/DisplayVector";
import * as BooleanType from "../../ssz/src/types/basic/boolean";
import * as NumberUintType from "../../ssz/src/types/basic/NumberUintType";
// import * as Array from '../../ssz/src/types/composite/array';
export default function VectorControls(props) {
  const [elementType, setElementType] = useState("Uint8");
  const [length, setLength] = useState("1");
  const [values, setValues] = useState([0]);
  const [maxValue, setMaxValue] = useState(255);
  const [serialized, setSerialized] = useState([]);
  const [numChunks, setNumChunks] = useState(1);
  const [size, setSize] = useState(8);
  const [valuesPerChunk, setVPC] = useState(32);
  const [lengthIdx, setLengthIdx] = useState(1)

  useEffect(() => {
    elementType === "Uint8"
      ? setMaxValue(255)
      : elementType === "Uint16"
      ? setMaxValue(2 ** 16 - 1)
      : elementType === "Uint32"
      ? setMaxValue(2 ** 32 - 1)
      : elementType === "Uint64"
      ? setMaxValue(2 ** 64 - 1)
      : elementType === "Uint128"
      ? setMaxValue(2 ** 128 - 1)
      : setMaxValue(2 ** 256 - 1);
  }, [elementType]);

  useEffect(() => {
    let values = [];
    for (let i = 0; i < length; i++) {
      let val = Math.floor(Math.random() * maxValue);
      values.push(val);
    }
    setValues(values);
    _serialize(values);
    setNumChunks(Math.floor(((length) / (256/size)) + 1));
    setVPC(256/size);
    setLengthIdx(length % valuesPerChunk);
    
  }, [length, elementType]);

  function _serialize(vector) {
    let _chunks = [];
    for (let c = 0; c < numChunks; c++) {
      let output = new Uint8Array(32);
      for (let i = 0; i < valuesPerChunk; i++) {
        output = NumberUintType.serialize(vector[c * valuesPerChunk + i], output, i, size);
      }
     if (c + 1 == numChunks) {
          output = NumberUintType.serialize(1, output, lengthIdx, size);
        
      }

      _chunks.push(output);
    }

    setSerialized(_chunks);
  }



  return (
    <>
      <div>VectorControls</div>
      <div>Elemnt Type:</div>
      <select
        className="form-select"
        aria-label="Select ElementType"
        onChange={(e) => setElementType(e.target.value)}
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
