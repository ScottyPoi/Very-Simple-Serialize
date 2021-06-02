import Node from "../components/graphics/nodes/Node";
import BuildTree from '../components/graphics/trees/BuildTree'
import { useEffect, useState } from "react";

export default function Graphics(props) {
  const [NUMBER_OF_VALUES, setN_O_V] = useState(3);

  function handleChange(event) {
    let num = event.target.value;
    setN_O_V(num);
  }

  return (
    <div className="container">
      <div className="row">I'm a page</div>
      <div className="row">
        <input type="number" min={1} max={32} onChange={handleChange} />
      </div>
      <BuildTree NUMBER_OF_VALUES={NUMBER_OF_VALUES} />
    </div>
  );
}
