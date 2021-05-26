import { useState } from "react";
import ListControls from "./ListControls";
import VectorControls from "./VectorControls";
import BitListControls from "./BitListControls";
import BitVectorControls from "./BitVectorControls";
import ContainerControls from "./ContainerControls";
import UnionControls from "./UnionControls";
export default function CompositeControls(props) {
  const [compositeType, setCompositeType] = useState("BitVector");

  return (
    <>
      <select
        className="form-select"
        aria-label="Select Composite Type"
        onChange={(e) => setCompositeType(e.target.value)}
      >
        <option selected>BitVector</option>
        <option value="BitList">BitList</option>
        <option value="List">List</option>
        <option value="Vector">Vector</option>
        <option value="Container">Container</option>
        <option value="Union">Union</option>
      </select>
      <div>{compositeType}</div>
      <div>
        {compositeType === "BitVector" ? (
          <BitVectorControls />
        ) : compositeType === "BitList" ? (
          <BitListControls />
        ) : compositeType === "Vector" ? (
          <VectorControls />
        ) : compositeType === "List" ? (
          <ListControls />
        ) : compositeType === "Container" ? (
          <ContainerControls />
        ) : (
          <UnionControls />
        )}
      </div>
    </>
  );
}
