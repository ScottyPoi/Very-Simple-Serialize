import { createHash } from 'crypto';
export default function SSZType({ ...props }) {
  const value = props.value;
  const uintType = props.uintType;
  const string = value ? "true" : "false";
  const offset = props.offset;
  const type = props.type;
  const defaultValue = props.defaultValue;
  const equals = props.equals;
  const serializeToBytes = props.serializeToBytes;
  const deserializeFromBytes = props.deserializeFromBytes;
  const typeValidate = props.typeValidate;
  const bytesValidate = props.bytesValidate;
  const hashTreeRoot = props.hashTreeRoot;
  const serial = props.serialized;
  
  const bytes = props.bytes

  function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

  typeValidate();
  // bytesValidate(value, offset);
  let serialized = new Uint8Array(bytes);
  serialized = serializeToBytes(value, serialized, offset);

  let root = new Uint8Array(32);
  root = hashTreeRoot(value);
  const deserialized = deserializeFromBytes(serialized, offset);
  let valid = equals(value, deserialized) ? "Yes" : "No";

  let hex = toHexString(serialized)
  let hexroot = toHexString(root);
  let hash = createHash('sha256');
  hash.update(root)
  hash = hash.digest('hex')
  return (
    <>
      <div>Type: {uintType ? uintType : type}</div>
      <br />
      <div>Default Value: {defaultValue}</div>
      <br />
      <div>Value: {`${value}`}</div>
      <br />
      <div>Offset: {offset}</div>
      <br />

      <div>Serialized: {serialized}</div>
      <br />
      <div>Serialized as Hex: 0x{hex}</div>
      <br />
      <div>Padded to Bytes32: {root}</div>
      <br />
      <div>Bytes32 as Hex: 0x{hexroot}</div>
      <br />
      <div>Hashed: 0x{hash}</div>
      <br/>
      <div>Deserialized: {`${deserialized}`}</div>
      <br />
      <div>Validate: {valid}</div>
      <br />
    </>
  );
}
