export default function DisplayBitList(props) {
let serialized = props.serialized;
let limit = props.limit;
let numEmpty = props.numEmpty;
let values = props.values;
    

    return (
        <div>
      serialized:{" "}
      {serialized.map((chunk) => {
        return (
          <div>
            0x{chunk}
          </div>)
      })}
      <br />
      <p>
        obj: BitVector[{limit}] = [
        {values.map((value, idx) => {
          return `${value}, `;
        })}
        {numEmpty.map((empty, idx) => {
          return `_____, `;
        })}
        ]
      </p>
        </div>
    )
}