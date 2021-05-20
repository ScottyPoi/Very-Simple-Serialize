import { createHash } from "crypto";
import { toHexString } from './merkleize';

export default function DisplayCompositeType({ ...props }) {
  const uintType = props.uintType;
  const type = props.type;
  const elementType = props.elementType;
  const length = props.length;
  const values = props.values;
  const chunk_count = props.chunk_count;
  const serialize = props.serialize;
  const _deserialize = props.deserialize;
  const arrayType = props.arrayType;
  const basicArrayType = props.basicArrayType;
  const vectorType = props.vectorType;
  const fullChunks = props.fullChunks;
  const root = props.root;
  const compositeType = props.compositeType;

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

  let serials = [];
  serials = serialize(values)

  

  const BasicVectorRoot = (chunks) => {
    let hashes = []
    for (let i = 0; i < chunks.length; i++) {
      let hash = createHash("sha256");
      hash.update(chunks[i]);
      hash = hash.digest();
      hashes.push(hash)
    };
    let root = Buffer.concat(hashes)
    return root;
  }

  let serialized = new Uint8Array(32)
  serialized = serialize(values, serialized)


  let serializedLength = serializeLength(length);
  

  let hash = root(serials)
  let hex = toHexString(hash);
  // props.chunks.map((chunk) => {
  //     let hash = createHash('sha256');
  //     hash.update(chunk)
  //     hash = hash.digest();
  //     serials.push(hash);
  // })
  


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
      <div>Type: Composite: {compositeType} : {vectorType}</div>
      <br />
      <div>Element Type: {uintType ? uintType : elementType}</div>
      <br />
      <div>Length: {length}</div>
      <div>Length (Serialized): 0x{serializedLength}</div>
      <br />
      <div>Values: {values.map((value) => {return `${value}, `})}</div>
      <br />
       <div>Chunks: ({chunk_count}) {serials.map((chunk) => {return (<div>{chunk}</div>)})}</div> 
      <br />
      <div>Root: 0x{root(serials).toString('hex')}</div>
      <br/>
      <div>Length (Serialized): 0x{serializedLength}</div>
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
