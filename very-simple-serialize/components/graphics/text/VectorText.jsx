import styles from "../styles/UintText.module.css";

export default function VectorText(props) {
  let _chunk = props.chunk;
  let _length = props.length;
  let _idx = props.idx;

  const chunk_count = props.numberOfChunks;
  let values_per_chunk = 256 / props.size;
  const size = props.size;

  const split = (_length * 2) % 64;
  let red = _idx + 1 == chunk_count ? 0 : _idx % 2 == 1 ? 240 : 0;
  let green = _idx + 1 == chunk_count ? 160 : 0;
  let blue = _idx + 1 == chunk_count ? 0 : _idx % 2 == 0 ? 256 : 180;
  let color = `rgb(${red},${green},${blue})`;

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

  function toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

  let numberOfLeaves = getNextPowerOfTwo(chunk_count);

  let emptyLeaves = numberOfLeaves - chunk_count;

  let valueBlocks = [];

  for (let i = 0; i < _chunk.length; i += size) {
    valueBlocks.push(_chunk.slice(i, i + size));
  }

  function parseChunk() {
    if (_idx === chunk_count - 1) {
      let hex = Array.from(toHexString(_chunk));
      let bits = hex.slice(0, (_length * size) / 2);
      let bitBlocks = [];
      let pads = hex.slice((_length * size) / 2);
      let lengthBit = pads[0];
      bits = bits.reverse();
      for (let i = 0; i < bits.length; i += 4) {
        bitBlocks.push([bits.slice(i, i + 4)]);
      }
      return (
        <div className="col" style={{ border: "dotted green" }}>
          <text className={`${styles.hex}`}>
            <span
              style={{ border: "solid black" }}
              className={`${styles.padding}`}
            >
              {pads.reverse()}
            </span>
            <span style={{ backgroundColor: "black", color: "gold" }}>
              0001
            </span>
            {bitBlocks.map((bitBlock) => {
              return (
                <span style={{ color: "green", border: "solid green 1px" }}>
                  {bitBlock}
                </span>
              );
            })}
          </text>
        </div>
      );
    } else {
      return (
        <div
          className="col"
          style={{ border: `solid ${color}`, display: `block` }}
        >
          {toHexString(_chunk.reverse())}
          {/* {valueBlocks.reverse().map((block) => {
            return (
              <div style={{ color: color, border: `solid ${color}`, display: 'inline-block' }}>
                {block.reverse().map((value) => {
                    return value
                })}
              </div>
            );
          })} */}
        </div>
      );
    }
  }
  const parsed = parseChunk();

  return parsed;
}
