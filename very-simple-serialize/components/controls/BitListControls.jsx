import { useEffect, useState } from "react";
import * as BooleanType from "../../ssz/src/types/basic/boolean";
import DisplayBitList from '../display/DisplayBitList';
export default function BitListControls(props) {
  const [length, setLength] = useState(1);
  const [limit, setLimit] = useState(1);
  const [values, setValues] = useState([false]);
  const [numEmpty, setNumEmpty] = useState([]);
  const [serialized, setSerialized] = useState([]);

  useEffect(() => {
    let values = [];
    for (let i = 0; i < length; i++) {
      let val = Math.random();
      let bool = val < 0.5 ? false : true;
      values.push(bool);
    }
    setValues(values);
  }, [length]);

  useEffect(() => {
    if (limit < length) {
      setLength(limit);
    }
  }, [limit]);

  useEffect(() => {
    let empties = [];
    if (limit > length) {
      for (let i = length; i < limit; i++) {
        empties.push("empty");
      }
    }
    setNumEmpty(empties);
    }, [length, limit]);

  useEffect(() => {
    _serialize(values);
  }, [length, limit])

  function _serialize(bitlist) {
    let count_chunks = Math.floor((Number(limit) + 255) / 256);
    let _chunks = [];
    for (let i = 0; i < count_chunks; i++) {
      let output = new Array(256);
      output.fill(0)
      for (let j = 0; j < 256; j++) {
        output = BooleanType.struct_serializeToBytes(
          bitlist[i * 256 + j],
          output,
          255 - j
        );
      }
      if (i == count_chunks - 1) {output = BooleanType.struct_serializeToBytes(true, output, 255 - (limit % 256))}
      _chunks.push(output);
    }
    setSerialized(_chunks);
  }

  return (
    <>
      <div>ListControls</div>
      <div>Element Type: boolean</div>
      <div>Limit: {limit}</div>
      <input
        value={limit}
        type="number"
        min={1}
        onChange={(e) => setLimit(e.target.value)}
      />
      <div>Length: {length}</div>
      <input
        value={length}
        type="number"
        min={0}
        max={limit}
        onChange={(e) => setLength(e.target.value)}
      />
      <br />
      <DisplayBitList
      serialized={serialized}
      limit={limit}
      numEmpty={numEmpty}
      values={values}>
        {props.children}
      </DisplayBitList>




    </>
  );
}
