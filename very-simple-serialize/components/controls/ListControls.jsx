import { useEffect, useState } from "react";
import * as NumberUintType from '../../ssz/src/types/basic/NumberUintType'
import DisplayList from '../display/DisplayList';





export default function ListControls(props) {
  const [elementType, setElementType] = useState("Uint8");
  const [length, setLength] = useState(0);
  const [limit, setLimit] = useState(32);
  const [values, setValues] = useState([]);
  const [maxValue, setMaxValue] = useState(255);
  const [numEmpty, setNumEmpty] = useState([]);
  const [valuesPerChunk, setValuesPerChunk] = useState(32);
  const [numChunks, setNumChunks] = useState(1);
  const [size, setSize] = useState(8);
  const [serialized, setSerialized] = useState([]);
  const [valueSet, setValueSet] = useState([]);

  useEffect(() => {
    setNumChunks(Math.floor((limit / valuesPerChunk) + 1));
    let newValues = valueSet.slice(0, length);
    // newValues.push(1);
    setValues(newValues);
  }, [length, elementType, limit]);
  
  // useEffect(() => {
  //   setLength(length);
  //   let vals = valueSet.slice(0, length)
  //   setValues(vals);
  // }, [valueSet])
  
  
  useEffect(() => {
    if (limit < length) {
      setLength(limit - 1);
    }
    let nc = Math.ceil(limit / valuesPerChunk);
    setNumChunks(nc);

  }, [limit]);

  function handleChangeLength(length) {
    setLength(length);
  };

  useEffect(() => {
    setNumChunks(Math.floor((length + valuesPerChunk) / valuesPerChunk));
  }, [length, valuesPerChunk]);

  useEffect(() => {
    _serialize(values);
  }, [values]);

  function handleTypeChange(type) {
    let mv = 0;
    let sz = 0;
    let vpc = 0;

    if (type === "Uint8") {
      mv = 255;
      sz = 8;
      vpc = 32;
    } else if (type === "Uint16") {
      mv = 2 ** 16 - 1;
      sz = 16;
      vpc = 16;
    } else if (type === "Uint32") {
      mv = 2 ** 32 - 1;
      sz = 32;
      vpc = 8;
    } else if (type === "Uint64") {
      mv = 2 ** 64 - 1;
      sz = 64;
      vpc = 4;
    } else if (type === "Uint128") {
      mv = 2 ** 128 - 1;
      sz = 128;
      vpc = 2;
    } else if (type === "Uint256") {
      mv = 2 ** 256 - 1;
      sz = 256;
      vpc = 1;
    }
    let valueSet = [];
    for (let i = 0; i < 16*32; i++) {
      let val = Math.floor(Math.random() * mv);
      valueSet.push(val);
    }    
    setSize(sz);    
    setMaxValue(mv);
    setValuesPerChunk(vpc);

    setValueSet(valueSet);

    setElementType(type);
    setLength(vpc-1);
    setNumChunks(Math.ceil(limit / valuesPerChunk))
  }

  function handleLimitChange(limit) {
    if (limit < length) {
      setLength(limit - 1);
    };
    let nc = limit / valuesPerChunk;
    setNumChunks(nc);
    setLimit(limit)
  }

  useEffect(() => {
    setNumChunks(Math.ceil(limit / valuesPerChunk));
  }, [length, limit]);

  function getSize() {
    return size
  }
  
  function _serialize(list) {
    let _chunks = [];
    let offset = size / 8 - 1;
    for (let c = 0; c < numChunks; c++) {
      let output = new Uint8Array(32);
      output.fill(0);
      for (let i = 0; i < valuesPerChunk; i++) {
        output = NumberUintType.serialize(
          list[c * valuesPerChunk + i],
          output,
          i * (size / 8),
          size
        );
      }
      if (c == Math.floor(length/valuesPerChunk)) {
        output = NumberUintType.serialize(
          1,
          output,
          (length*size/8 + offset) % 32,
          size
        );
      }

      _chunks.push(output);
    }

    setSerialized(_chunks);
  }

  function getEmpties() {
    return numEmpty;
  }

  return (
    <>
      <div>ListControls</div>
      <div>Element Type: {elementType}</div>
      <select
        className="form-select"
        aria-label="Select ElementType"
        onChange={(e) => handleTypeChange(e.target.value)}
      >
        <option selected>Uint8</option>
        <option value="Uint16">Uint16</option>
        <option value="Uint32">Uint32</option>
        <option value="Uint64">Uint64</option>
        <option value="Uint128">Uint128</option>
        <option value="Uint256">Uint256</option>
      </select>
      <div>Limit: {limit}</div>
      <input
        value={limit}
        type="number"
        min={valuesPerChunk}
        max={valuesPerChunk*16}
        step={valuesPerChunk}
        onChange={(e) => handleLimitChange(e.target.value)}
      />
      <div>Length: {length}</div>
      <input
        value={length}
        type="number"
        min={0}
        max={limit-1}
        onChange={(e) => handleChangeLength(e.target.value)}
      />
      <br />
      <br />
      <p>
        obj: List[{elementType}, {limit}] = [ 
        {values.map((value, idx) => {
          return `${value}, `
        })}
        {numEmpty.map((empty, idx) => {
          return `_______, `
        })}
        ]
      </p>
      <br />
      <DisplayList
        serialized={serialized}
        valuesPerChunk={valuesPerChunk}
        size={size}
        limit={limit}
        numEmpty={getEmpties()}
        values={values}
        length={length}
      >
        {props.children}
      </DisplayList>
    </>
  );
}
