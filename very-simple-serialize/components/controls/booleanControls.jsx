import { useState } from 'react';
import * as BooleanType from '../../ssz/src/types/basic/boolean'

export default function BooleanControls(props) {

    const [value, setValue] = useState(false)

    return (
        <div>
            <button onClick={() => setValue(true)}>true</button> <br />
            <button onClick={() => setValue(false)}>false</button> <br />

            value: boolean = {`${value}`} <br/>
            serialized: {value ? "0x01" : "0x00"} <br/>
 
            Padded to Bytes32: 0x{BooleanType.serialize(value, new Uint8Array(32), 15)}

        </div>
    )
}