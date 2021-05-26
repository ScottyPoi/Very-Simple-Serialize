import { useEffect, useState } from "react";

export default function BitListControls(props) {
  const [length, setLength] = useState(1);
  const [limit, setLimit] = useState(1);
  const [values, setValues] = useState([false]);
  const [numEmpty, setNumEmpty] = useState([]);

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
      <br />
      <p>
        obj: Vector[bit, {length}] = [ <br />{" "}
        {values.map((value, idx) => {
          return (
            <div>
              <p>{`val${idx}: boolean = ${value}, `}</p>
              <br />
            </div>
          );
        })}
        {numEmpty.map((empty, idx) => {
          return (
            <div>
              <p>{`val${idx + length}: empty `}</p>
              <br />
            </div>
          );
        })}
        ]
      </p>
    </>
  );
}
