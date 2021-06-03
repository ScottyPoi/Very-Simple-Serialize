import styles from "../styles/UintText.module.css";

export default function BitVectorText(props) {
  let _chunk = props.chunk;
  let _length = props.length;
  let _idx = props.idx;

  const chunk_count = props.num;
  const split = _length % 256;

  let red = _idx + 1 == chunk_count ? 0 : _idx % 2 == 1 ? 240 : 0;
  let green = _idx + 1 == chunk_count ? 160 : 0;
  let blue = _idx + 1 == chunk_count ? 0 : _idx % 2 == 0 ? 256 : 180;
  let color = `rgb(${red},${green},${blue})`;

  function parseChunk() {
    if (_idx === chunk_count - 1) {
      let bits = _chunk.splice(256 - split);
      let pads = _chunk.splice(0, 256 - split);
      return (
        <div className="row text-break ">
          <text className={`${styles.padding}`}>{pads.toString()},<span className={`${styles.hex}`}>
            {bits.toString()}</span>
          </text>
        </div>
      );
    } else {
      return (
        <div className="row text-break">
          <div style={{ color: color }}>{_chunk.toString()}</div>
        </div>
      );
    }
  }
  const parsed = parseChunk();

  return parsed;
}
