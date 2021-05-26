import { useState } from "react";

export default function TypeSelect({ ...props }) {


  const type = props.type;
    const selectType = props.selectType;



  return (
    <div>
      <ul className="nav nav-tabs">
            <li className='nav-item'><button  onClick={() => selectType("Basic")}>Basic</button></li>
            <li className='nav-item'><button  onClick={() => selectType("Composite")}>Composite</button></li>
      </ul>

</div>
  );
}
