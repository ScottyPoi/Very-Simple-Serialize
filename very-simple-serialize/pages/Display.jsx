import Controls from '../components/controls/Controls';
import { useState } from "react";

export default function Display() {
  const [type, selectType] = useState("Basic");



  return (
    <div className="container">
      <div className="row">
        <Controls
        selectType={selectType}
        type={type} />
      </div>
    </div>
  );
}
