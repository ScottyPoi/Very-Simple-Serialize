import { useState, useEffect } from "react";
import RandomUint from "./RandomUint";
import * as NumberUintType from "../../ssz/src/types/basic/NumberUintType";
import * as BigIntUintType from "../../ssz/src/types/basic/BigIntUintType";

import UintNDisplay from "../display/UintNDisplay";
import DisplayTreeValue from "../display/DisplayTreeValue";
export default function UintNControls(props) {
  const [uintSize, setUintSize] = useState(8);
  const [_value, setValue] = useState(0);
  const [_serialized, setSerialized] = useState(new Uint8Array(8));
  const [_asBytes32, setAsBytes32] = useState(new Uint8Array(32))

  function serialize() {
    let value = _value;
    let output = new Uint8Array(32);
    let serial = new Uint16Array(32);
    let output2 = new Uint8Array(32);
    let serial2 = new Uint16Array(32);
    // output = Uint8Array.from(_serialized);
    let serialized =  uintSize < 64 ? NumberUintType.serialize(value, output, 0, uintSize) : BigIntUintType.serialize(value, output2, 0 , uintSize)
    let bytes = uintSize < 64 ? NumberUintType.serialize(value, serial, 32-uintSize/8, uintSize) : BigIntUintType.serialize(value, serial2, 32-(uintSize/8), uintSize)
    setSerialized(serialized);
    setAsBytes32(bytes)
  }

  function size_of() {
    return uintSize;
  }

  function setBytes(event) {
    setUintSize(event.target.value);
  }

  useEffect(() => {
    randomValue(uintSize);
  }, [uintSize]);

  function randomValue(size) {
    let val = 0;

    val = size < 64 ? Math.floor(Math.random() * 2 ** size) : BigInt(Math.random() * 2 ** size)
    setValue(val);
  }

  function value() {
    return _value;
  }

  function serialized() {
    return _serialized;
  }

  function bytes() {
    return _asBytes32
  }

  useEffect(() => {
    serialize();
  }, [value]);

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
        <button onClick={() => randomValue(size_of())}>Change Value</button>
      </div>
      <div>
        <UintNDisplay
          type={NumberUintType.NUMBER_UINT_TYPE}
          value={value()}
          byteLength={uintSize}
          serialized={serialized()}
          asBytes32={bytes()}
        >
          {props.children}
        </UintNDisplay>
      </div>
    </div>
  );
}
