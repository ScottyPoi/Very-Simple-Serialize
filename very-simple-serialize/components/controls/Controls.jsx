import TypeSelect from "./TypeSelect";
import BasicControls from "./BasicControls";
import CompositeControls from "./CompositeControls";

export default function Controls({ ...props }) {
  const type = props.type;
  const selectType = props.selectType;

  function DisplayBasicControls() {
    return <BasicControls />;
  }

  function DisplayCompositeControls() {
    return <CompositeControls />;
  }

  return (
    <div className="container">
      <div className="d-flex flex-row ">
        <TypeSelect type={type} selectType={selectType} />
      </div>
      <div className="row">
        {type == "Basic" ? DisplayBasicControls() : DisplayCompositeControls()}
      </div>
    </div>
  );
}
