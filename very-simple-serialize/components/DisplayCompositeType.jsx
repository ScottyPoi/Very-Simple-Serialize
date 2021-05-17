import { createHash } from "crypto";
import { toHexString } from './merkleize';

export default function DisplayCompositeType({ ...props }) {
  const uintType = props.uintType;
  const type = props.type;
  const elementType = props.elementType;
  const length = props.length;
  const values = props.values;
  const serialize = props.serialize;
  const _deserialize = props.deserialize;
  const arrayType = props.arrayType;
  const basicArrayType = props.basicArrayType;
  const vectorType = props.vectorType;

  const serializeLength = (length) => {
    let array = new Uint8Array(32);
    let val = length;
    const MAX_BYTE = 0xff;
    for (let i = 0; i < 32; i++) {
      array[i] = val & MAX_BYTE;
      val = Math.floor(val / 256);
    }
    return array;
  };



  let serialized = new Uint8Array(32)
  serialized = serialize(values, serialized)

  let serializedLength = serializeLength(length);
  let hex = toHexString(serialized);

  let hash = createHash('sha256');
  hash.update(serialized)
  hash = hash.digest();

  let hashedLength = createHash('sha256');
  hashedLength.update(serializedLength)
  hashedLength = hashedLength.digest();

  let concat = Buffer.concat([hash, hashedLength], 64)
  let merkleRoot = createHash('sha256');
  merkleRoot.update(concat);
  merkleRoot = merkleRoot.digest('hex');

  let deserialized = _deserialize(serialized);
  // let valid = equal(values, deserialized) ? "Yes" : "No";



  return (
    <div>
      <div>Type: Composite: {basicArrayType} : {vectorType}</div>
      <br />
      <div>Element Type: {uintType ? uintType : elementType}</div>
      <br />
      <div>Length: {length}</div>
      <br />
      <div>Length (Serialized): 0x{serializedLength}</div>
      <br />
      <div>Values: {values.map((value) => {return `${value}, `})}</div>
      <br />
       <div>Serialized Values: {serialized}</div> 
      <br />
      <div>Length (Serialized): 0x{serializedLength}</div>
      <br />
      <div>Serialized as Hex: 0x{hex}</div>
      <br />
      <div>Hashed: 0x{hash.toString('hex')}</div>
      <br />
      <div>MerkleRoot: 0x{merkleRoot}</div>
      <br />
      <div>Deserialized: {deserialized.map((value) => {return `${value}, `})}</div>
      <br />
      {/*<div>Validate: {valid}</div> */}
      <br />
    </div>
  );
}
