import CompositeType from './CompositeType';

export default function ByteArray({...props}) {

    const toHexString = (target) => {
        return "0x" + [...target].map((b) => b.toString(16).padStart(2, "0")).join("");
    }

    const fromHexString = (data) => {
        if (typeof data !== "string") {
          throw new Error("Expected hex string to be a string");
        }
        if (data.length % 2 !== 0) {
          throw new Error("Expected an even number of characters");
        }
        data = data.replace("0x", "");
        return new Uint8Array(data.match(/.{1,2}/g).map((b) => parseInt(b, 16)));
      }

      const byteArrayEquals = (a, b) => {
        if (a.length !== b.length) {
          return false;
        }
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) return false;
        }
        return true;
      }

      const getByteBits = (target, offset) => {
        const byte = target[offset];
        if (!byte) {
          return [false, false, false, false, false, false, false, false]
        }
        const bits = Array.prototype.map.call(byte.toString(2).padStart(8, "0"), (c) => (c === "1" ? true : false)).reverse();
        return bits;
      }



    return (
        <CompositeType
        toHexString={toHexString}
        fromHexString={fromHexString}
        byteArrayEquals={byteArrayEquals}
        getByteBits={getByteBits}
        type={"ByteArray"}>
            {props.children}
        </CompositeType>
    )
}