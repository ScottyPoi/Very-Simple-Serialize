import { useState } from "react";
import UintNControls from "../controls/uintNControls";
// import TreeValue from '../../ssz/src/backings/tree/treeValue'
import * as NumberUintType from "../../ssz/src/types/basic/NumberUintType";


export function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }
export default function UintNDisplay(props) {
  return (
    <div>
      Type: Uint{props.byteLength} <br></br>
      Value: {props.value} <br></br>
      Serialized: 0x{toHexString(props.serialized)}<br/>
      As Bytes32: 0x{toHexString(props.asBytes32)} <br/>
    </div>
  );
}
