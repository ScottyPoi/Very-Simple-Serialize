import { useEffect, useState } from "react";

import * as BitVectorType from "../../ssz/src/types/composite/bitVector";
import * as BooleanType from "../../ssz/src/types/basic/boolean";
import DisplayBitVector from '../display/DisplayBitVector'

let valueSet = [false];
for (let i = 0; i < 256*16; i++) {
  let val = Math.random();
  let bool = val > 0.5 ? false : true;
  valueSet.push(bool);
  valueSet.push(false);
}

export default function BitVectorControls(props) {
  const [length, setLength] = useState("1");
  const [values, setValues] = useState([false]);
  const [serialized, setSerialized] = useState([]);
  const [numChunks, setNumChunks] = useState(1);

  

  
  
  useEffect(() => {
    _serialize(values);
  }, [length]);

  function handleChangeLength(length) {
    let nc = Math.floor((Number(length) + 255) / 256);
    let vals = valueSet.slice(0,length).reverse();
    setNumChunks(nc);
    setValues(vals);
    setLength(length)
  };

  function _serialize(bitvector) {
    let _chunks = [];
    for (let c = 0; c < numChunks; c++) {
      let output = new Array(256);
      output.fill(0);
      let len = bitvector.length;
      for (let i = 0; i < 256; i++) {
        output = BooleanType.struct_serializeToBytes(
          bitvector[c * 256 + i],
          output,
          255 - i
        );
      if (c + 1 == numChunks) {
        output = BooleanType.struct_serializeToBytes(
          true,
          output,
          (length%256)-length
        );
      }  
      }
      _chunks.push(output);
    }

    setSerialized(_chunks);
  }
  function toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

  // function serialize(values) {
  //   let vals = values;
  //   let output = new Uint8Array(32);
  //   output = Uint8Array.from(serialized);
  //   output = BitVector.serialize(vals, output);
  //   return output;
  // }

  return (
    <>
      <div>BitVectorControls</div>
      <div>Length: {length}</div>
      <div>
        <p>ChunkCount: {numChunks}</p>
      </div>
      <input
        value={length}
        type="number"
        min={1}
        onChange={(e) => handleChangeLength(e.target.value)}
      />
      <br />
      <br />
      <DisplayBitVector
      serialized={serialized}
      values={values}
      length={length}
      >{props.children}</DisplayBitVector>
      
    </>
  );
}
