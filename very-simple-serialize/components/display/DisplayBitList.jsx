import BitListText from '../graphics/text/BitListText'
import styles from '../graphics/styles/UintText.module.css'
export default function DisplayBitList(props) {
let serialized = props.serialized;
let limit = props.limit;
let values = props.values;
let length = props.length;
let numEmpty = new Array(limit - length);
function chunks() {
  
  let chunks = serialized.map((chunk, idx) => {
    let multiplier = idx + 1
    let empty = limit > multiplier * 256 && length < multiplier * 256 ? true : false
    return (
      <div className="row overflow-auto" key={idx} id={`chunk${idx}`}>
        Chunk {`${idx}`}: {`[`}
           <BitListText
            chunk={chunk}
            limit={limit}
            length={length}
            idx={idx}
            num={serialized.length}
            empty={empty}
          /> 
      </div>
    );
  });
  return chunks;
}
    

    return (
        <div>
      serialized:{chunks()}
      {/* {serialized.map((chunk) => {
        return (
          <div>
            0x{chunk}
          </div>)
      })} */}
      <br />
      <p>
        obj: BitList[{limit}] = [
        {values.map((value, idx) => {
          return `${value}, `;
        })}
        {numEmpty.map((empty, idx) => {
          return <span className={styles.empties}>{`_____, `}</span>;
        })}
        ]
      </p>
        </div>
    )
}