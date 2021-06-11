import { useEffect, useState } from "react";
import * as BooleanType from "../../ssz/src/types/basic/boolean";
import DisplayBoolean from "../display/BooleanDisplay";
import BuildTree from "../graphics/trees/BuildTree";
// import { toHexString } from '../../ssz/src/util/byteArray'

export function toHexString(byteArray) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");
}
export default function BooleanControls(props) {
  const [value, setValue] = useState(false);
  const [serialized, setSerialized] = useState(new Uint8Array(1));
  const [bytes32, setBytes32] = useState(new Uint8Array(32));

  function _serialize() {
    let val = value;
    let output = new Uint8Array(1);
    let bytes = new Uint8Array(32);
    output = BooleanType.serialize(val, output, 0);
    bytes = BooleanType.serialize(val, bytes, 31);
    setSerialized(output);
    setBytes32(bytes);
  }

  useEffect(() => {
    _serialize();
  }, [value]);

  return (
    <div className="row">
      <div className="col">
        <DisplayBoolean value={value} serialized={serialized} bytes32={bytes32}>
          {props.children}
        </DisplayBoolean>
      </div>
      <div className="col">
        <button onClick={() => setValue(true)}>true</button> <br />
        <button onClick={() => setValue(false)}>false</button> <br />
      </div>
      <div className='col'>
      <div className="row">
                  <h3>Type:<br/>Boolean</h3>
                </div>
                <div className="row text-break">
                  <h3>Value:<br/>{value.toString()} </h3>
                  <br></br>
                </div>
                <div className="row text-break">
                  <h3>
                    toBytes:<br/>
                    <span style={{border: 'solid black 2px', display: 'inline-block', width: 'auto'}}>0x<span style={{color: "green"}}>{bytes32.slice(30)}</span></span>
                  </h3>
                </div>

      </div>
    </div>
  );
}
