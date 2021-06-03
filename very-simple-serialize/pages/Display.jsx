import Controls from '../components/controls/Controls';
import { useState } from "react";

export default function Display() {
  const [type, selectType] = useState("Basic");



  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="row">Controls</div>
        <Controls
        selectType={selectType}
        type={type} />
        </div>
        {/* <div className="col">Structural</div>
        <div className="col">Tree</div>
        <div className="col">Serialized</div> */}
      </div>
    </div>
  );
}
