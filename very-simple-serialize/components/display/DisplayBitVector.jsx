import BitVectorText from "../graphics/text/BitVectorText";
import styles from "../graphics/styles/UintText.module.css";

export default function DisplayBitVector(props) {
  let serialized = props.serialized;
  let values = props.values;
  let length = props.length;

  function toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

  function chunks() {
    let chunks = serialized.map((chunk, idx) => {
      return (
        <div
          className="row overflow-auto"
          key={idx}
          id={`chunk${idx}`}
        >
          <div className="col"> Chunk {`${idx}`}: </div>
          <div className="col">
            [
            <BitVectorText
              chunk={chunk}
              length={length}
              idx={idx}
              num={serialized.length}
            />
            ]{" "}
          </div>
        </div>
      );
    });
    return chunks;
  }

  //   const chunks = toHexString(serialized[0]);

  //   const fullchunks = serialiized.length
  //   totalschunks = getnextpoweroftwo(fullchunks)
  //   emptychunks = totalschunks - fullchunks
  //   //   5 nodes needss 8 leafs

  //   total leafs = totalschunkns
  //   total nodes = leafs * 2 - 1

  //   branch nodes = leafts * 2 - 2 - leafs
  //   root = gethashtreeroot(serialized)
  //   treelevels = 3 + getnextpoweroftwo(totalshulnks)//8

  return (
    <>
      <div className='conatiner'>
        <div className='row' >
          serialized: 
        </div>
        <div className='row' >
          
        {chunks()}</div>
      <br />
      <p>
        obj: BitVector[{length}] = [
        
        <div className={styles.hex}>
        {values.map((value) => {
          return `${value}, `
        })}
        </div>
        ]
      </p>
    </div>
    </>
  );
}
