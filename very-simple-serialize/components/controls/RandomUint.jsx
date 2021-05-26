import { useState } from "react";


export default function RandomUint(props) {

    const size = props.size;

    const value = Math.floor(Math.random() * 2**size);

    return (
        <div>
            {value}
        </div>)
}