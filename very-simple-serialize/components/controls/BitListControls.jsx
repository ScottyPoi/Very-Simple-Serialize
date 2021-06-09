import { useEffect, useState } from "react";
import * as BooleanType from "../../ssz/src/types/basic/boolean";
import DisplayBitList from "../display/DisplayBitList";

let valueSet = [];
for (let i = 0; i < 256 * 16; i++) {
  let val = Math.random();
  let bool = val > 0.5 ? false : true;
  valueSet.push(bool);
}
export default function BitListControls(props) {
  const [length, setLength] = useState(0);
  const [limit, setLimit] = useState(256);
  const [values, setValues] = useState([]);
  const [numEmpty, setNumEmpty] = useState([]);
  const [serialized, setSerialized] = useState([]);
  const [numChunks, setNumChunks] = useState(1);

  useEffect(() => {
    if (limit < length) {
      setLength(limit - 1);
    }
    let nc = Math.floor(limit / 256);
    setNumChunks(nc);

  }, [limit]);



  function handleChangeLength(length) {
    let vals = valueSet.slice(0, length);
    setLength(length);
    setValues(vals);
  };

  useEffect(() => {
    _serialize(values);
  }, [values]);


  function _serialize(bitlist) {
    let _chunks = [];
    for (let i = 0; i < numChunks; i++) {
      let output = new Uint16Array(256);
      output.fill(0);
      for (let j = 0; j < 256; j++) {
        output = BooleanType.struct_serializeToBytes(
          bitlist[i * 256 + j],
          output,
          j
        );
      }
      if (i == Math.floor(length/256)) {
        output = BooleanType.struct_serializeToBytes(true, output, length%256);
      }

      _chunks.push(output);
    }
    setSerialized(_chunks);
  }

  // let empties = [];
  //     for (let i = length; i < limit; i++) {
  //       empties.push("empty");
  //     }

  function getEmpties() {
    return numEmpty;
  }

  return (
    <>
      <div>ListControls</div>
      <div>Element Type: boolean</div>
      <div>Limit: {limit}</div>
      <input
        value={limit}
        type="number"
        min={256}
        step={256}
        max={256 * 16}
        onChange={(e) => setLimit(e.target.value)}
      />
      <div>Length: {length}</div>
      <input
        value={length}
        type="number"
        min={0}
        max={limit-1}
        onChange={(e) => handleChangeLength(e.target.value)}
      />
      <br />
      <DisplayBitList
        serialized={serialized}
        limit={limit}
        numEmpty={getEmpties()}
        values={values}
        length={length}
      >
        {props.children}
      </DisplayBitList>
    </>
  );
}
