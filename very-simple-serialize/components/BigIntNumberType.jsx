import BasicType from './BasicType';


export default function BigIntNumberType({...props}) {

    const value = props.value;
    const offset = props.offset;
    const uintType = props.uintType;
    const byteLength = uintType === "Uint64" ? 8 : uintType === "Uint128" ? 16 : 32;
    const BIGINT_4_BYTES = BigInt(32);

    const assertValidValue = () => {
        if (typeof value !== "bigint") {
            throw new Error("Uint value is not a bigint");
          }
          if ((value) < 0) {
            throw new Error("Uint value must be gte 0");
          }   
    }

    const serializeToBytes = (value, output, offset) => {    
    let array = new Uint8Array()
    array = Uint8Array.from(output)
    let v = value;
    let groupedBytes = Number(BigInt.asUintN(32, v));
    for (let i = 0; i < byteLength; i++) {
      array[offset + i] = Number(groupedBytes & 0xff);
      if ((i + 1) % 4 !== 0) {
        groupedBytes >>= 8;
      } else {
        v >>= BIGINT_4_BYTES;
        groupedBytes = Number(BigInt.asUintN(32, v));
      }
    }
    return array;
    }

    const deserializeFromBytes = (data, offset) => {
        let output = BigInt(0);
        let idx = 0;
        for (let i = 0; i < byteLength; i++) {
          let op = data[offset + i] * 2 ** (8 * (i % 4));
          if (op) {
              if ((i+1) % 4 === 0) {
                    output += BigInt((op) * 2 ** (32 * idx))
                }
              }
              
            }
        
        return output;
    }

    const clone = () => {
        return <BigIntNumberType {...props} />
    }


    return (
        <BasicType 
        value={value}
        type={"Uint"}
        uintType={uintType}
        offset={offset}
        uintType={uintType}
        defaultValue={0}
        assertValidValue={assertValidValue}
        serializeToBytes={serializeToBytes}
        deserializeFromBytes={deserializeFromBytes}
        clone={clone}
        />
    )
}