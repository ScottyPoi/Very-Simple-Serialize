import { useEffect, useState } from "react";
import * as BooleanType from "../../ssz/src/types/basic/boolean";
import DisplayBoolean from "../display/BooleanDisplay";
import BuildTree from "../graphics/trees/BuildTree";
// import { toHexString } from '../../ssz/src/util/byteArray'
import Node from "../graphics/nodes/Node";

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
        <div className="d-flex flex-row justify-content-center">
          <div className="d-flex flex-col">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setValue(false)}
            >
              false
            </button>
          </div>
          <div className="d-flex flex-col">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setValue(true)}
            >
              true
            </button>
          </div>
        </div>
        <div className="row justify-content-center ">
          <div className="col">
            <div className="card">
              <div className="card-body" style={{ textAlign: "center" }}>
                <h5 className="card-title">Boolean Type</h5>
                <h5 className="card-title">1 BIT</h5>

                <p className="card-text">
                  <div className='container'>
                    <div className='row'>
                      <div className='col'>
                          FALSE<br/>
                          0<br/>
                          0x00<br/>
                      </div>
                      <div className='col'>
                          TRUE<br/>
                          1<br/>
                          0x01<br/>
                      </div>
                    </div>
                  </div>
                  <br />
                  MerkleTree - Depth 1<br />
                  The hash of the 32 Byte padded chunk is the hash_tree_root of
                  the simple object
                </p>
                <button href="#" className="btn btn-primary">
                  Go somewhere
                </button>
                <button href="#" className="btn btn-primary">
                  Go somewhere
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row">
          <h3>
            Type:
            <br />
            Boolean
          </h3>
        </div>
        <div className="row text-break">
          <h3>
            Value:
            <br />
            {value.toString()}{" "}
          </h3>
          <br></br>
        </div>
        <div className="row text-break">
          <h3>
            toBytes:
            <br />
            <span
              style={{
                border: "solid black 2px",
                display: "inline-block",
                width: "auto",
              }}
            >
              0x<span style={{ color: "green" }}>{bytes32.slice(30)}</span>
            </span>
          </h3>
        </div>
        <div className="d-flex flex-row align-items-center">
          <div className="col-9 mx-2">
            <h4>Padded to Bytes32:</h4>
          </div>
          <div className="col-3 mx-2">
            <Node
              className=""
              chunkIdx={0}
              numChunks={1}
              level="leaf"
              type="32"
            />
          </div>
          <br></br>
        </div>
        <div className="d-flex flex-row">
          <div className="col-9 mx-2">
            <h4>hash_tree_root:</h4>
          </div>
          <div className="col-3 mx-2">
            <Node chunkIdx={0} numChunks={1} level="root" type="R" />
          </div>
          <br></br>
        </div>
      </div>
    </div>
  );
}
