export default function BooleanDisplay(props) {
    let value = props.value;
    let serialized = props.serialized;
    let bytes32 = props.bytes32
    function toHexString(byteArray) {
        return Array.prototype.map.call(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
      }

    return (
        <div>
    value: boolean = {`${value}`} <br/>
    serialized: 0x{toHexString(serialized).slice(0,4)} <br/>

    Padded to Bytes32: 0x{toHexString(bytes32)}
</div>)
}