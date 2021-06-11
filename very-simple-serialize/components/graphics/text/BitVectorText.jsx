import styles from "../styles/UintText.module.css";
import * as BitVector from '../../../ssz/src/types/composite/bitVector'
import * as BigInt from '../../../ssz/src/types/basic/BigIntUintType'
export default function BitVectorText(props) {
  let _chunk = props.chunk;
  let _length = props.length;
  let _idx = props.idx;

  const chunk_count = props.num;
  const split = (_length * 2) % 512;

  let red = _idx + 1 == chunk_count ? 0 : _idx % 2 == 1 ? 240 : 0;
  let green = _idx + 1 == chunk_count ? 160 : 0;
  let blue = _idx + 1 == chunk_count ? 0 : _idx % 2 == 0 ? 256 : 180;
  let color = `rgb(${red},${green},${blue})`;

  function toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

  function getNextPowerOfTwo(number) {
    if (number <= 1) {
      return 1;
    } else {
      let i = 2;
      while (i < Infinity) {
        if (number <= i) {
          return i;
        } else {
          i *= 2;
        }
      }
    }
  }

  let numberOfLeaves = getNextPowerOfTwo(chunk_count);

  let emptyLeaves = (numberOfLeaves = chunk_count);

  function parseChunk() {
    if (_idx == chunk_count - 1) {
      let bits = _chunk.slice(0, split)
      let lengthBit = _chunk.slice(split, split + 2);
      let pads = _chunk.slice(split + 2);
     let big = parseInt(props.array.reverse().join(''), 2)
     let serial = new Uint16Array(64);
     serial = BigInt.serialize(big, serial, 0, 32)
      return (
        <div className="col" >
          <div className='row' style={{ border: 'solid black 2px', color: 'gold', backgroundColor: 'green'}}>
            0x{toHexString(serial)}
          </div>
          <div className='row' style={{ border: "solid green" }} >
          <text className={`${styles.hex}`}>
            {bits.toString()}
            <span style={{ backgroundColor: "black", color: "gold" }}>
              {lengthBit}
            </span>
            <span className={`${styles.padding}`}>{pads.toString()} </span>
          </text>
        </div>
        </div>
      );
    } else {
      return (
        <div
          className="col"
          style={{ border: `solid ${color}`, display: `block` }}
        >
          <div style={{ color: color }}>{_chunk.toString()}</div>
        </div>
      );
    }
  }
  const parsed = parseChunk();

  return parsed;
}
