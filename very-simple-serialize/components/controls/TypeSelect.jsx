import { useState } from "react";

export default function TypeSelect({ ...props }) {


  const type = props.type;
    const selectType = props.selectType;



  return (
    <div className='button-group'>
<button  onClick={() => selectType("Basic")}>Basic</button>
<button  onClick={() => selectType("Composite")}>Composite</button>

</div>
  );
}
