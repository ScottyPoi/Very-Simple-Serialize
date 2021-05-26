import { useState } from "react";
import RandomUint from "./RandomUint";

export default function UintNControls(props) {
  const [uintSize, setUintSize] = useState(8);
  const [value, setValue] = useState(0);

  function size_of() {
    return uintSize;
  }

  function setBytes(event) {
    setUintSize(event.target.value);
  }

  function randomValue(size) {
    let val = Math.floor(Math.random() * 2 ** size);
    setValue(val);
  }

  return (
    <div>
      <div>{/* <input value={uintSize} type="number"  /> */}</div>
      <div>
        Bytes
        <select
          className="form-select"
          aria-label="Select Byte Size"
          onChange={(e) => setBytes(e)}
        >
          <option selected>8</option>
          <option value="16">16</option>
          <option value="32">32</option>
          <option value="64">64</option>
          <option value="128">128</option>
          <option value="256">256</option>
        </select>
      </div>
      <div>
        <button onClick={() => randomValue(uintSize)}>Change Value</button>
      </div>
      <div>
        <h2>value: uint{uintSize} = {value}</h2>
      </div>
    </div>
  );
}
