import BooleanText from '../graphics/text/BooleanText';
import BuildTree from '../graphics/trees/BuildTree';
import {createHash} from 'crypto';
import styles from '../graphics/styles/UintText.module.css'
export default function BooleanDisplay(props) {

    function toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
      }

    let value = props.value;
    let serialized = `0x${toHexString(props.serialized)}`;
    let bytes32 = `0x${toHexString(props.bytes32)}`
    let hash = createHash('sha256')
    hash.update(props.bytes32);
    hash = hash.digest('hex')
    return (
        <div className='row'>
          <div className='col'>
    value: boolean = {`${value}`} <br/>
      <BooleanText serialized={serialized} asBytes32={bytes32} />
      hash_tree_root: <div className={`d-inline-flex ${styles.hash}`}>0x{hash}</div>
      </div>
      <div className='col'>
      As Merkle Tree: <BuildTree NUMBER_OF_VALUES={1} />
    </div>
</div>)
}