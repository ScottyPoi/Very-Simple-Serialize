import { useState } from "react";
import UintNControls from "../controls/uintNControls";
// import TreeValue from '../../ssz/src/backings/tree/treeValue'
import * as NumberUintType from "../../ssz/src/types/basic/NumberUintType";
import UintText from "../graphics/text/UintText";
import BuildTree from '../../components/graphics/trees/BuildTree'
import {createHash} from 'crypto'
import styles from '../graphics/styles/UintText.module.css'
export function toHexString(byteArray) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");
}

export default function UintNDisplay(props) {
  let serialized = `0x${toHexString(props.serialized).slice(
    0,
    props.byteLength / 4
  )}`;
  let asBytes32 = `0x${toHexString(props.asBytes32)}`;

  let hash = createHash('sha256')
  hash.update(props.asBytes32);
  hash = hash.digest('hex')

  return (
    <div className='row'>
    <div className='col'>
      Type: Uint{props.byteLength} <br></br>
      Value: {props.value.toString(10)} <br></br>
      <UintText serialized={serialized} asBytes32={asBytes32} /> <br />
      hash_tree_root: <div className={`d-inline-flex ${styles.hash}`}>0x{hash}</div>
    </div>
    <div className='col'>
      As Merkle Tree: <BuildTree NUMBER_OF_VALUES={1} />
    </div>
    </div>
  );
}
