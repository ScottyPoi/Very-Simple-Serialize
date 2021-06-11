import styles from "../styles/UintText.module.css";

export default function BooleanText(props) {
  const serialized = props.serialized;
  const asBytes32 = props.asBytes32;
  const padding = asBytes32.length - serialized.length + 2;

  function parseSerial() {
    let bitmask = serialized.slice(0, 2);
    let hex = serialized.slice(2);
    return (
      <div className="d-flex flex-row justify-content-start">
        <div className={`p-0 text-end ${styles.bitmask}`}>{bitmask}</div>{" "}
        <div className={`p-0  ${styles.hex}`}>{hex}</div>
      </div>
    );
  }

  function parseBytes32() {
    let bitmask = asBytes32.slice(0, 2);
    let zeroes = asBytes32.slice(2, padding);
    let hex = asBytes32.slice(padding);
    return (
      <div className="d-flex flex-row">
        <text><span>{bitmask}</span><span style={{color: 'red'}}>{zeroes}</span><span style={{color: 'green'}}>{hex}</span></text>
      </div>
    );
  }

  return (
    <div className={`d-flex flex-row text-break  ${styles.bytes32}`}>
      {parseBytes32()}<br/>
    </div>
  );
}
