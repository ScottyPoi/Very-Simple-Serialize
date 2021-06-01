import TreeValue from '../../ssz/src/backings/tree/treeValue/treeValue';
import BasicArrayTreeValue from '../../ssz/src/backings/tree/treeValue/BasicArrayTreeValue';
// import { BOOLEAN_TYPE } from '../../ssz/src/types';


export default function SimpleTree(props) {

  let _typeSymbols = new Set();
    


  return (
    <div className="container">
      <div className="row">
        <div className="col"></div>
        <div className="col">
            <div className='row'>
              <TreeValue
              type={"NUMBER_UINT_TYPE"}
              tree={16}
              /> 
            </div>
        </div>
        <div className="col">Tree Test MF</div>
      </div>
    </div>
  );
}
