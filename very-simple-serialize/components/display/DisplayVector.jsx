import BuildTree from '../graphics/trees/BuildTree'
import VectorText from '../graphics/text/VectorText';
import * as NumberUintType from '../../ssz/src/types/basic/NumberUintType';
export function DisplayVector(props) {
    let serialized = props.serialized;
    let values = props.values;
    let length = props.length;
    let size = props.size;

    let numberOfChunks =  Math.floor(length / (256/size)) + 1 

    let NUMBER_OF_VALUES = numberOfChunks;

    let numberOfLeaves = getNextPowerOfTwo(NUMBER_OF_VALUES);

    let emptyLeaves = numberOfLeaves - NUMBER_OF_VALUES;

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



      function chunks() {
        let chunks = serialized.map((chunk, idx) => {
            

            let _output = toHexString(chunk);

            
          
          
            return ( 
                 <VectorText
                 numberOfLeaves={numberOfLeaves}
                 emptyLeaves={emptyLeaves}
                 key={idx} 
                 id={`chunk${idx}`}
                  chunk={_output}
                  length={length}
                  size={size}
                  idx={idx}
                  numberOfChunks={numberOfChunks}
                /> 
          
        );
              });
        
        for (let i=0; i<emptyLeaves; i++) {
          chunks.push(
            <div className='col' style={{ border: "solid gray"}}>EMPTY</div>
          )
        }
    
        return chunks;
      }

      function _values() {
        let numChunks = numberOfChunks;
        let valueChunks = [];
        for (let i = 0; i < numChunks; i++) {
          let startIdx = i * 256/size;
          let endIdx =
            startIdx + 256/size - 1 > serialized.length
              ? startIdx + 256/size
              : serialized.length - 1;
          valueChunks.push(values.slice(startIdx, endIdx));
        }
        return valueChunks;
      }


      return (
        <>
          <div className="container">
            <div className='row'>
              <div className='col-10'>
          <BuildTree NUMBER_OF_VALUES={NUMBER_OF_VALUES} />
    
            <div className={`row row-cols-${numberOfLeaves} text-break`}>
            {chunks()}
            </div>
            <br />
            </div>
             
              <div className='col'>
                <p> 
              obj: Vector[{length}] = [
              <div className={`row  text-break`} >
                {_values().map((valueChunk, idx) => {
                  let red = idx + 1 == _values().length ? 0 : idx % 2 == 1 ? 256 : 0
                  let green = idx + 1 == _values().length ? 200 : 0
                  let blue = idx + 1 == _values().length ? 0 : idx % 2 == 0 ? 256 : 150
                  let color = `rgb(${red},${green},${blue})`
                  return (
                    <div style={{ color: color}}>
                      {valueChunk.reverse().map((value) => {
                        return `${value}, `;
                      })}
                    </div>
                  )
                })}
                                    <div style={{ color: "green"}}>0x01(LEN)</div>

              </div>
              ]
              </p>
          </div>
        
          </div>
          </div>
        </>
      );








}