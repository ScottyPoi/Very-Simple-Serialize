import styles from "../styles/UintText.module.css";

export default function BitListText(props) {
  let _chunk = props.chunk;
  let _length = props.length;
  let _idx = props.idx;
  let _limit = props.limit;
  let _empty = props.empty;

  const chunk_count = props.num;
  const split = 256 - (_limit % 256);
  const split2 = 256 - (_length % 256 );

  let red = _idx + 1 == chunk_count ? 0 : _idx % 2 == 1 ? 240 : 0;
  let green = _idx + 1 == chunk_count ? 160 : 0;
  let blue = _idx + 1 == chunk_count ? 0 : _idx % 2 == 0 ? 256 : 180;
  let color = `rgb(${red},${green},${blue})`;

  function parseChunk() {
    if (_idx === chunk_count - 1) {
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let fulls = _chunk.slice(split2);
      let empties = _chunk.slice(split, split2);
      let pads = _chunk.slice(0, split - 1);
      return (
        <div className="row text-break ">
          <text className={`${styles.hex}`}>
            {fulls.reverse().toString()},<span className={`${styles.empties}`}>{empties.reverse().toString()}</span><span className={`${styles.delimeter}`}>1,</span><span className={`${styles.padding}`}>{pads.reverse().toString()} </span>
          </text>]
        </div>
      );
    } else if (_empty) {
        return (
          <div className="row text-break">
            <div style={{ color: color, border: "solid gray", backgroundColor: "lightgray" }}>{_chunk.toString()}</div>
          </div>
        );
      } else {
      return (
        <div className="row text-break">
          <div style={{ color: color }}>{_chunk.reverse().toString()}</div>
        </div>
      );
    }
  }
  const parsed = parseChunk();

  return parsed;
}
