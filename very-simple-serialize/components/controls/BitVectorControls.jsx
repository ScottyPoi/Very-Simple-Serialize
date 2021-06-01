import { useEffect, useState } from "react";

import * as BitVector from '../../ssz/src/types/composite/bitVector';
export default function BitVectorControls(props) {
  const [length, setLength] = useState("1");
  const [values, setValues] = useState([false]);
  const [serialized, setSerialized] = useState(new Uint8Array(32))

  useEffect(() => {
    let values = [];
    for (let i = 0; i < length; i++) {
      let val = Math.random();
      let bool = val > 0.5 ? false : true
      values.push(bool);
    }
    setValues(values);
  }, [length]);



  function serialize(values) {
    let vals = values;
    let output = new Uint8Array(32)
    output = Uint8Array.from(serialized);
    output = BitVector.serialize(vals, output)
    return output
  }

  useEffect(() => {
    setSerialized(serialize(values))
  }, [values])


  return (
    <>
      <div>BitVectorControls</div>
      <div>Length: {length}</div>
      <input
        value={length}
        type="number"
        min={1}
        onChange={(e) => setLength(e.target.value)}
      />
      <br />
      <br />
      <p>
        obj: BitVector[{length}] = [ <br />
        {values.map((value, idx) => {
          return (
            <div>
              <p>{`bit${idx}: boolean = ${value}, `}</p>
              <br />
            </div>
          );
        })}
        ]
      </p> <br/>
      <p>obj = [{(values.map((value) => { return `${value.toString()}, `}) )}]</p><br/>
      <p>obj = [{values.map((value) => {return value ? 1 : 0 })}]</p><br/>
      <p>serialized: {serialized.toString(16)}</p>
    </>
  );
}
