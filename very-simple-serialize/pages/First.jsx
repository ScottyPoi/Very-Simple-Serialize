import UintNType from "../components/types/basic/UintNType";
import BooleanType from "../components/types/basic/BooleanType";
// import ContainerType from "../components/types/composite/ContainerType";
import BasicVectorType from "../components/types/composite/BasicVectorType";
// import CompositeVectorType from '../components/types/composite/CompositeVectorType'
// import ListType from "../components/types/composite/ListType";
// import ByteVectorType from "../components/types/composite/ByteVectorType";
// import BitVectorType from "../components/types/composite/BitListTypeBitVectorType";
// import BitListType from "../components/types/composite/BitListType";
export default function First() {
  return (
    <div className="container">
      <div className="row">
        <UintNType value={1122} offset={0} uintType={"Uint32"} />
        {/* <BooleanType value={true} offset={0} /> */}
        <BasicVectorType values={[255,254,123,132,103, 245, 245, 254, 246]} elementType={"uintN"} uintType={"uint32"} length={9} byteLength={4}></BasicVectorType>
      </div>
    </div>
  );
}

