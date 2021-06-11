import { useState } from "react";
import BooleanControls from "./booleanControls";
import UintNControls from "./uintNControls";

export default function BasicControls(props) {
  const [basicType, setBasicType] = useState("UintN");

  function showUintNControls() {
    return <UintNControls />;
  }

  function showBooleanControls() {
    return <BooleanControls />;
  }

  return (
    <div>
      <div className="row">
        <div className="col">
          <div className="nav nav-tabs">
            <button onClick={() => setBasicType("UintN")}>UintN</button>
            <button onClick={() => setBasicType("Boolean")}>Boolean</button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="row">
          {basicType === "UintN" ? showUintNControls() : showBooleanControls()}
        </div>
      </div>
    </div>
  );
}
