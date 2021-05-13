import { createHash } from 'crypto';
export default function SSZType({ ...props }) {
  const value = props.value;
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

  function toHexString(byteArray) {
    return Array.prototype.map.call(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
  }

  typeValidate();
  bytesValidate();
  let serialized = new Uint8Array(8);
  serialized = serializeToBytes(value, serialized, offset);

  let root = new Uint8Array(32);
  root = hashTreeRoot(value);
  const deserialized = deserializeFromBytes(serialized, offset);
  let valid = equals(value, deserialized) ? "true" : "false";

  let hex = toHexString(serialized)
  let hexroot = toHexString(root);
  let hash = createHash('sha256');
  hash.update(root)
  hash = hash.digest('hex')
  return (
    <>
      <div>Type: {type}</div>
      <br />
      <div>Default Value: {defaultValue}</div>
      <br />
      <div>Value: {type === "Uint" ? value : string}</div>
      <br />
      <div>Offset: {offset}</div>
      <br />

      <div>Serialized: {serialized}</div>
      <br />
      <div>Hex: {hex}</div>
      <br />
      <div>HashTreeRoot: {root}</div>
      <br />
      <div>HashTreeRootHex: {hexroot}</div>
      <br />
      <div>Hash: {hash}</div>
      <br/>
      <div>Deserialized: {deserialized ? "true" : "false"}</div>
      <br />
      <div>Validate: {valid}</div>
      <br />
    </>
  );
}
