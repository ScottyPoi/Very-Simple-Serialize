import { useState, useEffect } from "react";
import RandomUint from "./RandomUint";
import * as NumberUintType from "../../ssz/src/types/basic/NumberUintType";
import * as BigIntUintType from "../../ssz/src/types/basic/BigIntUintType";
import UintNDisplay from "../display/UintNDisplay";
import DisplayTreeValue from "../display/DisplayTreeValue";
import Node from "../graphics/nodes/Node";
import styles from "../graphics/styles/NodeStyles.module.css";
const { randomBytes } = require("crypto");

export function toHexString(byteArray) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");
}

export default function UintNControls(props) {
  const [uintSize, setUintSize] = useState(8);
  const [_value, setValue] = useState(0);
  const [_serialized, setSerialized] = useState(new Uint8Array(8));
  const [_asBytes32, setAsBytes32] = useState(new Uint8Array(32));

  function getvalue() {
    return _value;
  }

  function size_of() {
    return uintSize;
  }

  function serialize() {
    let value = getvalue();
    let output = new Uint8Array(32);
    let serial = new Uint16Array(32);
    let output2 = new Uint8Array(32);
    let serial2 = new Uint16Array(32);
    // output = Uint8Array.from(_serialized);
    let serialized =
      size_of() < 64
        ? NumberUintType.serialize(value, output, 0, size_of())
        : BigIntUintType.serialize(value, output2, 0, size_of());
    let bytes =
      size_of() < 64
        ? NumberUintType.serialize(value, serial, 32 - size_of() / 8, size_of())
        : BigIntUintType.serialize(
            value,
            serial2,
            32 - size_of() / 8,
            size_of()
          );
    setSerialized(serialized);
    setAsBytes32(bytes);
  }

  function setBytes(event) {
    setUintSize(event.target.value);
  }

  useEffect(() => {
    randomValue(uintSize);
  }, [uintSize]);

  function randomValue(size) {
    let val =
      size < 64
        ? Math.floor(Math.random() * 2 ** size)
        : BigInt(Math.floor(Math.random() * 2 ** size));
    setValue(val);
  }

  function serialized() {
    return _serialized;
  }

  function bytes() {
    return _asBytes32;
  }

  useEffect(() => {
    serialize();
  }, [_value]);

  return (
    <div className="row">
                <div className="col">
            <UintNDisplay
              type={NumberUintType.NUMBER_UINT_TYPE}
              value={getvalue()}
              byteLength={uintSize}
              serialized={serialized()}
              asBytes32={bytes()}
            >
              {props.children}
            </UintNDisplay>
          </div>
      <div className="col">
        <div className="d-flex flex-row">
          <div className="d-flex flex-col">
            <h3>Uint[</h3>
          </div>
          <div className="d-flex flex-col">
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
            <h3>]</h3></div>
        </div>
        <div className="d-flex flex-row">
          <div className="flex-col">
            <button onClick={() => randomValue(size_of())}>Change Value</button>
          </div>

        </div>
      </div>
      <div className="col">
        <div className="row">
          <div className="col">
            <div className="row">
              <div className="col">
                <div className="row">
                  <h3>Type:<br/>Uint{uintSize}</h3> <br></br>
                </div>
                <div className="row text-break">
                  <h3>Value:<br/>{getvalue().toString()} </h3>
                  <br></br>
                </div>
                <div className="row text-break">
                  <h3>
                    toBytes:<br/>
                    <span style={{border: 'solid black 2px', display: 'inline-block', width: '300px'}}>0x<span style={{color: "green"}}>{toHexString(serialized()).slice(0, uintSize / 4)}</span></span>
                  </h3>
                </div>
                <div className="d-flex flex-row align-items-center">
                <div className="col-9 mx-2"><h4>Padded to Bytes32:</h4></div>
                <div className="col-3 mx-2"><Node className="" chunkIdx={0} numChunks={1} level="leaf" type="32" /></div>
                  <br></br>
                </div>
                <div className="d-flex flex-row">
                <div className="col-9 mx-2"><h4>hash_tree_root:</h4></div>
                <div className="col-3 mx-2"><Node chunkIdx={0} numChunks={1} level="root" type="R" /></div>
                  <br></br>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
