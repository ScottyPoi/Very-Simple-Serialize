import TypeSelect from './TypeSelect';
import BasicControls from './BasicControls';
import CompositeControls from './CompositeControls';

export default function Controls({...props}) {
    const type = props.type;
    const selectType = props.selectType;

    function DisplayBasicControls() {
        return <BasicControls />;
      }
    
      function DisplayCompositeControls() {
        return <CompositeControls />;
      }

    return (
        <div>
        <TypeSelect 
        type={type}
        selectType={selectType}
        />
        <div className="row">
        {type == "Basic"
          ? DisplayBasicControls()
          : DisplayCompositeControls()}
      </div>
      </div>
        
    )
}