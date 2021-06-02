import { useEffect, useState } from "react";

export default function ListControls(props) {
  const [elementType, setElementType] = useState("Uint8");
  const [length, setLength] = useState(1);
  const [limit, setLimit] = useState(1);
  const [values, setValues] = useState([0]);
  const [maxValue, setMaxValue] = useState(255);
  const [numEmpty, setNumEmpty] = useState([]);

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
  }, [length, elementType]);

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
      <div>Element Type:</div>
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
        obj: List[{elementType}, {limit}] = [ 
        {values.map((value, idx) => {
          return `${value}, `
        })}
        {numEmpty.map((empty, idx) => {
          return `_______, `
        })}
        ]
      </p>
    </>
  );
}
