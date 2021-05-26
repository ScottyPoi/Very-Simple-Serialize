import { useState } from 'react';

export default function BooleanControls(props) {

    const [value, setValue] = useState(false)

    return (
        <div>
            <button onClick={() => setValue(true)}>true</button> <br />
            <button onClick={() => setValue(false)}>false</button> <br />

            value: boolean = {`${value}`}

        </div>
    )
}