export default function SSZType({...props}) {
  const value = props.value;
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


    typeValidate();
    bytesValidate();  
    let serialized = new Uint8Array(8)
    serialized = serializeToBytes(value, serialized, offset);
    // const valid = equals(value, deserialized)
    let root = new Uint8Array(32)
    root = hashTreeRoot(value);
const deserialized = deserializeFromBytes(serialized, offset);

  return (
      <>
  <div>Value: {value}</div><br/>
  <div>Offset: {offset}</div><br/>
  <div>Type: {type}</div><br/>
  <div>Default Value: {defaultValue}</div><br/>
  <div>Serialized: {serialized}</div><br/>
  <div>HashTreeRoot: {root}</div><br/>

  <div>Deserialized: {deserialized}</div><br/>
  {/* <div>Validate: {valid}</div><br/> */}

  </>)
}
