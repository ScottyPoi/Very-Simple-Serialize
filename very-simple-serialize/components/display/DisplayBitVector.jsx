import BitVectorText from "../graphics/text/BitVectorText";
import styles from "../graphics/styles/UintText.module.css";
import BuildTree from "../graphics/trees/BuildTree";
import * as BitVector from "../../ssz/src/types/composite/bitVector.jsx";
import * as BigInt from "../../ssz/src/types/basic/BigIntUintType";
import HashRootText from "../graphics/text/HashRootText";
import hash from "../../e-z-serialize/persistent/hash";
import { createHash } from "crypto";
import { useState } from "react";
import {merkleize} from '../../ssz/src/util/merkleize';

export default function DisplayBitVector(props) {
  let serialized = props.serialized;
  let values = props.values;
  let length = props.length;
  let NUMBER_OF_VALUES = Math.floor(length / 256 + 1);

  const [_chunks, setChunks] = useState();

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
  let numberOfLevels = Math.log2(numberOfLeaves);
  
  function getValues() {
    return props.values
  };
  function getLength() {
    return props.length
  };

  function getNumberOfEmptyLeaves() {
    let NUMBER_OF_VALUES = Math.floor((getLength() / 256) + 1);
    let numberOfLeaves = getNextPowerOfTwo(NUMBER_OF_VALUES);
    let emptyLeaves = numberOfLeaves - NUMBER_OF_VALUES;
    return emptyLeaves

  };

  function toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

  function chunks() {
    let chunks = serialized.map((chunk, idx) => {
      let big = parseInt(chunk.slice().reverse().join(""), 2);
      let serial = new Uint16Array(64);
      serial = BigInt.serialize(big, serial, 0, 32);
      let hex = toHexString(serial);
      return (
        <BitVectorText
          key={idx}
          id={`chunk${idx}`}
          chunk={toHexString(chunk)}
          length={length}
          idx={idx}
          num={serialized.length}
          array={chunk}
          hex={hex}
        />
      );
    });
    for (let i = 0; i < emptyLeaves; i++) {
      let empty = new Uint16Array(64);
      empty.fill(0);
      empty = BigInt.serialize(0, empty, 0, 32)
      chunks.push(
        <BitVectorText 
        key={serialized.length + i}
        id={`emptyChunk${i}`}
        chunk={toHexString(empty)}
        length={length}
        idx={serialized.length + i}
        num={serialized.length}
        array={empty}
        hex={toHexString(empty)}
        emtpy={true}
        />
      );
    }

    return chunks
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




  let leaves = serialized.map((chunk) => {
    let hash = createHash("sha256");
    hash.update(chunk);
    return hash.digest();
  });

  // for (let i = 0; i < getNumberOfEmptyLeaves(); i++) {
  //   let empty = new Uint16Array(64);
  //   empty.fill(0);
  //   empty = BigInt.serialize(0, empty, 0, 32)
  //   let hash = createHash("sha256");
  //   hash.update(empty);
  //   leaves.push(hash.digest())
  // }

  // function hashTree(leaves) {
  //   if (leaves.length > 1) {
  //     let hashes = [];
  //     for (let i = 0; i < leaves.length; i += 2) {
  //       let hash = createHash("sha256");
  //       hash.update(Buffer.concat([leaves[i], leaves[i+1]]));
  //       hashes.push(hash.digest());
  //     }
  //     if (hashes.length > 1) {
  //       return hashTree(hashes);
  //     } else {
  //       return hashes;
  //     }
  //   } else {
  //     return leaves
  //   }
  // }

  // let hashRoot = hashTree(leaves);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10">
            <div className="row justify-content-center">
              {/* <HashRootText hash={hashRoot} /> */}
              0x{merkleize(leaves)}
            </div>
            <div className="row">
              <BuildTree NUMBER_OF_VALUES={NUMBER_OF_VALUES} />
            </div>

            <div
              className={`row justify-content-center row-cols-${numberOfLeaves} text-break`}
            >
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
