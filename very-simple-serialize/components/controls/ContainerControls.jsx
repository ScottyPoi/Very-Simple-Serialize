import { useEffect, useState } from "react";
import GetRandomValue from '../math/GetRandomValue';
export default function ContainerControls(props) {
  const [length, setLength] = useState("1");
  const [values, setValues] = useState([["Boolean", true]]);
  const [types, setTypes] = useState({
    "Uint8": false,
    "Boolean": true,
    "Uint16": false,
    "Uint32": false,
    "Uint64": false,
    "Uint128": false,
    "Uint256": false,
    "BitVector": false,
    "BitList": false,
    "Vector": false,
    "List": false,
    "Container": false,
    "Union": false,
  });
  const [activeTypes, setActiveTypes] = useState(["Boolean"]);



  useEffect(() => {
      let typeList = types
      let active = []
      for (let type in typeList) {
        if (typeList[type] === true) {
            active.push(type)
        }}
        setActiveTypes(active);
    }, [length])

  useEffect(() => {
    let len = length;
    let numTypes = activeTypes.length;
    let values = [];
    for (let i = 0; i < len; i++) {
        let idx = i % numTypes
        let type = activeTypes[idx]
        let val = GetRandomValue(type);
      values.push([type, val]);
    }
    setValues(values);
  }, [length]);

  const include = (value) => {
    let includes = types;
    let typ = value;
    includes[typ] === true ? (includes[typ] = false) : (includes[typ] = true);
    return setTypes(includes);
    
  }

  return (
    <>
      <div>ContainerControls</div>
      <div>
        Includes:{" "}
        {activeTypes.map((type) => {
            return `${type}, `;
        })}
      </div>
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="Boolean"
          value="Boolean"
          onClick={(e) => include(e.target.value)}
          defaultChecked
        />
        <label className="form-check-label" for="Boolean">
          Boolean
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Uint8"
          value="Uint8"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Uint8">
          Uint8
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          onClick={(e) => include(e.target.value)}
          value="Uint16"
          id="Uint16"
        />
        <label className="form-check-label" for="Uint16">
          Uint16
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Uint32"
          value="Uint32"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Uint32">
          Uint32
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Uint64"
          value="Uint64"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Uint64">
          Uint64
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Uint128"
          value="Uint128"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Uint128">
          Uint128
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Uint256"
          value="Uint256"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Uint256">
          Uint256
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="BitVector"
          value="BitVector"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="BitVector">
          BitVector
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="BitList"
          value="BitList"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="BitList">
          BitList
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Vector"
          value="Vector"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Vector">
          Vector
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="List"
          value="List"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="List">
          List
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Container"
          value="Container"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Container">
          Container
        </label>
        <br />
        <input
          className="form-check-input"
          type="checkbox"
          id="Union"
          value="Union"
          onClick={(e) => include(e.target.value)}
        />
        <label className="form-check-label" for="Union">
          Union
        </label>
        <br />
      </div>

      <div>Length: {length}</div>
      <input
        value={length}
        type="number"
        min={1}
        onChange={(e) => setLength(e.target.value)}
      />
      <br />
      <br />
      <p>
        obj: Container[ <br />
        {values.map((value, idx) => {
          return (
            <>
              {`(val${idx}: ${value[1][0]}), `}
              <br />
            </>
          );
        })}
        ] = [ <br />{" "}
        {values.map((value, idx) => {
          return <p>{`${value[1][1]}, `}</p>;
        })}
        ]
      </p>
    </>
  );
}

