import { useEffect, useState } from "react";
export default function BitVectorControls(props) {
  const [length, setLength] = useState("1");
  const [values, setValues] = useState([false]);

  useEffect(() => {
    let values = [];
    for (let i = 0; i < length; i++) {
      let val = Math.random();
      let bool = val > 0.5 ? false : true
      values.push(bool);
    }
    setValues(values);
  }, [length]);

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
      </p>
    </>
  );
}
