import BitVectorText from "../graphics/text/BitVectorText";
import styles from "../graphics/styles/UintText.module.css";
import BuildTree from "../graphics/trees/BuildTree";
import * as BitVector from '../../ssz/src/types/composite/bitVector.jsx'

export default function DisplayBitVector(props) {
  let serialized = props.serialized;
  let values = props.values;
  let length = props.length;

  let NUMBER_OF_VALUES = Math.floor(length / 256 + 1);

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

  let numberOfLeaves = getNextPowerOfTwo(NUMBER_OF_VALUES);

  let emptyLeaves = numberOfLeaves - NUMBER_OF_VALUES;

  function toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

  function chunks() {
    let chunks = serialized.map((chunk, idx) => {
        
      
      
        return(
        <div className="col">
          <div className="row">
            <BitVectorText
              key={idx}
              id={`chunk${idx}`}
              chunk={toHexString(chunk)}
              length={length}
              idx={idx}
              num={serialized.length}
              array={chunk}
            />
          </div>
          
        </div>
      );
    });

    for (let i = 0; i < emptyLeaves; i++) {
      chunks.push(
        <div className="col" style={{ border: "solid gray" }}>
          EMPTY
        </div>
      );
    }

    return chunks;
  }

  function _values() {
    let numChunks = serialized.length;
    let valueChunks = [];
    for (let i = 0; i < numChunks; i++) {
      let startIdx = i * 256;
      let endIdx =
        startIdx + 255 > serialized.length
          ? startIdx + 256
          : serialized.length - 1;
      valueChunks.push(values.slice(startIdx, endIdx));
    }
    return valueChunks;
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
      <div className="container">
        <div className="row">
          <div className="col-10">
            <BuildTree NUMBER_OF_VALUES={NUMBER_OF_VALUES} />

            <div className={`row row-cols-${numberOfLeaves} text-break`}>
              {chunks()}
            </div>
            <br />
          </div>

          <div className="col">
            <p>
              obj: BitVector[{length}] = [
              <div className={`row  text-break`}>
                {_values().map((valueChunk, idx) => {
                  let red =
                    idx + 1 == _values().length ? 0 : idx % 2 == 1 ? 256 : 0;
                  let green = idx + 1 == _values().length ? 200 : 0;
                  let blue =
                    idx + 1 == _values().length ? 0 : idx % 2 == 0 ? 256 : 150;
                  let color = `rgb(${red},${green},${blue})`;
                  return (
                    <div style={{ color: color }}>
                      {valueChunk.map((value) => {
                        return `${value}, `;
                      })}
                    </div>
                  );
                })}
              </div>
              ]
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
