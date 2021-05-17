import { createHash } from 'crypto';

export default function DisplayVectorType({ ...props }) {

    const uintType = props.uintType;
    const type = props.type;
    const length = props.length;
    const values = props.values;
    const serialize = props.serialize;
    const deserialize = props.deserialize;

    let serialized = new Uint8Array(32);
    serialized = serialize(values, type, length)

    let deserialized = deserialize(serialized);
    let valid = equal(values, deserialized) ? "Yes" : "No";

    let hex = toHexString(serialized);
    let hash = createHash('sha256');
    hash.update(serialized)
    hash = hash.digest('hex');
  
    return (
    <div>
      <div>Type: Vector</div>
      <br />
      <div>Element Type: {uintType ? uintType : type}</div>
      <br />
      <div>Length: {length}</div>
      <br />
      <div>Values: {values}</div>
      <br />
      <div>Serialized: {serialized}</div>
      <br />
      <div>Serialized as Hex: 0x{hex}</div>
      <br />
      <div>Hashed: 0x{hash}</div>
      <br />
      <div>Deserialized: {deserialized}</div>
      <br />
      <div>Validate: {valid}</div>
      <br />
    </div>
  );
}
