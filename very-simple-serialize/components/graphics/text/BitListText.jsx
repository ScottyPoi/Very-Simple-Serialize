import styles from "../styles/UintText.module.css";

export default function BitListText(props) {
  let _chunk = props.chunk;
  let _length = props.length;
  let _idx = props.idx;
  let _limit = props.limit;

  const chunk_count = props.num;

  let red = _idx + 1 == chunk_count ? 0 : _idx % 2 == 1 ? 240 : 0;
  let green = _idx + 1 == chunk_count ? 160 : 0;
  let blue = _idx + 1 == chunk_count ? 0 : _idx % 2 == 0 ? 256 : 180;
  let color = `rgb(${red},${green},${blue})`;

  function parseChunk() {
    if (_idx === 0 && chunk_count === 1) {
      let split = 256 - (_limit % 256);
      let split2 = 256 - (_length % 256);
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let empties = _chunk.slice(split, split2);
      let fulls = _chunk.slice(split2);
      let pads = _chunk.slice(0, split - 1);
      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid ${color}`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {fulls.reverse().toString()},
              <span className={`${styles.delimeter}`}>1,</span>
              <span className={`${styles.empties}`}>
                {empties.reverse().toString()}
              </span>
              <span className={`${styles.padding}`}>
                {pads.reverse().toString()}{" "}
              </span>
            </text>
          </div>
        </div>
      );
    } else if (
      _length < _idx * 256 &&
      _idx == chunk_count - 1 &&
      chunk_count > 1 &&
      _limit > _idx * 256
    ) {
      let split = 256 - (_limit % 256);
      let split2 = _length >= _idx * 256 ? 256 - (_length % 256) : 255;
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let empties = _chunk.slice(split, split2);
      let fulls = _chunk.slice(split2);
      let pads = _chunk.slice(0, split - 1);

      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid red`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {_length >= _idx * 256 ? `${fulls.reverse().toString()},` : null}
              <span className={`${styles.empties}`}>
                {empties.reverse().toString()},
              </span>
              <span className={`${styles.padding}`}>
                {pads.reverse().toString()}{" "}
              </span>
            </text>
            {`]`}
          </div>
        </div>
      );
    } else if (
      _length < (_idx + 1) * 256 &&
      _idx == chunk_count - 1 &&
      chunk_count > 1
    ) {
      let split = 256 - (_limit % 256);
      let split2 = _length >= _idx * 256 ? 256 - (_length % 256) : 255;
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let empties = _chunk.slice(split, split2);
      let fulls = _chunk.slice(split2);
      let pads = _chunk.slice(0, split - 1);

      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid green`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {_length >= _idx * 256 ? fulls.reverse().toString() : null},
              <span className={`${styles.delimeter}`}>1****,</span>

              <span className={`${styles.empties}`}>
                {empties.reverse().toString()}
              </span>
              <span className={`${styles.padding}`}>
                {pads.reverse().toString()}{" "}
              </span>
            </text>
            {`]`}
          </div>
        </div>
      );
    } else if (_idx == chunk_count - 1 && chunk_count > 1) {
      let split = 256 - (_limit % 256);
      let split2 = _length >= _idx * 256 ? 256 - (_length % 256) : 255;
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let empties = _chunk.slice(split, split2);
      let fulls = _chunk.slice(split2);
      let pads = _chunk.slice(0, split - 1);

      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid red`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {_length >= _idx * 256 ? fulls.reverse().toString() : null},

              <span className={`${styles.empties}`}>
                {empties.reverse().toString()}
              </span>
              <span className={`${styles.padding}`}>
                {pads.reverse().toString()}{" "}
              </span>
            </text>
            {`]`}
          </div>
        </div>
      );
    } else if (
      _idx < chunk_count &&
      chunk_count > 1 &&
      _length > (_idx + 1) * 256
    ) {
      let split = 256 - (_limit % 256);
      let split2 = _length < 256 ? 255 - _length : 255;
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let empties = _length < 256 ? _chunk.slice(0, split2) : [];
      let fulls = _length < 256 ? _chunk.slice(split2) : _chunk;
      let pads = _chunk.slice(0, split - 1);

      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid  ${color}`, display: `block` }}
          >
            <text style={{color: color}}>
              {fulls.reverse().toString()},

              <span className={`${styles.empties}`}>
                {empties.reverse().toString()}
              </span>
            </text>
          </div>
        </div>
      );
    } else if (_idx === 0 && chunk_count > 1) {
      let split = 256 - (_limit % 256);
      let split2 = _length < 256 ? 255 - _length : 255;
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let empties = _length < 256 ? _chunk.slice(0, split2) : [];
      let fulls = _length < 256 ? _chunk.slice(split2) : _chunk;
      let pads = _chunk.slice(0, split - 1);

      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid  green`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {fulls.reverse().toString()},
              <span className={`${styles.delimeter}`}>1****,</span>

              <span className={`${styles.empties}`}>
                {empties.reverse().toString()}
              </span>
            </text>
          </div>
        </div>
      );
    } else if (props.empty) {
      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid ${color}`, display: `block`, color: color }}
          >
            <text className={`${styles.hex}`}>
              <span className={`${styles.empties}`}>
                {_chunk.reverse().toString()}
              </span>
            </text>
          </div>
        </div>
      );
    } else if (
      _length >= _idx * 256 &&
      _length < (_idx + 1) * 256 &&
      _limit >= (_idx + 1) * 256
    ) {
      let split = 256 - (_length % 256);
      let fulls = _chunk.slice(split).reverse();
      let empties = _chunk.slice(0, split);
      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid green`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {fulls.reverse().toString()},
              <span className={`${styles.delimeter}`}>1************</span>

              <span className={`${styles.empties}`}>
                {empties.reverse().toString()}
              </span>
            </text>
          </div>
        </div>
      );
    } else if (_length > (_idx + 1) * 256) {
      return (
        <div className="row text-break ">
          <div
            className="col"
            style={{ border: `solid ${color}`, display: `block`, color: color }}
          >
            <text >
              {_chunk.reverse().toString()},
            </text>
            {`]`}1
          </div>
        </div>
      );
    } else {
      return (
        <div className="row text-break">
          <div style={{ color: color }}>{_chunk.toString()}</div>0
        </div>
      );
    }
  }
  const parsed = parseChunk();

  return parsed;
}
