import styles from "../styles/UintText.module.css";



export default function ListText(props) {
  // _chunk is an array of hex strings

  let _chunk = props.chunk;
  let _length = props.length;
  let _idx = props.idx;
  let _limit = props.limit;
  let valuesPerChunk = props.valuesPerChunk
    let size = props.size;
    let digits = size/4
  const chunk_count = props.chunk_count;

  function pair(bits) {
    let pairs = []
    let array = Array.from(bits);
    for (let i=0;i<array.length;i+=digits) {
  pairs.push(array.slice(i,i+digits))
    };
    return pairs
  };

  let red = _idx + 1 == chunk_count ? 0 : _idx % 2 == 1 ? 240 : 0;
  let green = _idx + 1 == chunk_count ? 160 : 0;
  let blue = _idx + 1 == chunk_count ? 0 : _idx % 2 == 0 ? 256 : 180;
  let color = `rgb(${red},${green},${blue})`;
      let reversed = Array.from(_chunk).reverse();
      reversed = reversed.join("");
  function parseChunk() {

    let valueBlocks = [];
    for (let i=0; i<_chunk.length; i+=size/4) {
        valueBlocks.push(_chunk.substring(i, i+size/4))
    }




    if (_idx === 0 && chunk_count === 1) {
      let len = _length * digits;
      let split = len % 512;
      let pads = _chunk.substring(split + digits, 512);
      let lengthBit = _chunk.substring(split, split + digits);
      let fulls = _chunk.substring(0, split);
      let bits = [];
      for (let i = 0; i < fulls.length; i += digits) {
        bits.push(fulls.substring(i, i + digits));
      }
      let pad = [];
      for (let i = 0; i < pads.length; i += digits) {
        pad.push(pads.substring(i, i + digits));
      }


      return (
        <div className="row text-break ">
          <div className="col">
          <div className="row" style={{border: `solid ${color} 1px`, color: 'gold', backgroundColor: color}}>0x{_chunk}</div> 

            <div
              className="row"
              style={{ border: `solid ${color}`, display: `block` }}
            >
              <text className={`${styles.hex}`}>
                {bits.map((value, idx) => {
                  return (
                    <span style={{ border: "solid green 1px" }}>{value}</span>
                  );
                })}
                ,<span className={`${styles.delimeter}`}>{lengthBit}A</span>
                <span className={`${styles.padding}`}>
                  {pad.map((value) => {
                    return (
                      <span style={{ border: "solid green 1px" }}>{value}</span>
                    );
                  })}
                </span>
              </text>
            </div>
          </div>
        </div>
      );
    } else if (
      _length < _idx * valuesPerChunk &&
      _idx == chunk_count - 1 &&
      chunk_count > 1 
    ) {
      let split = (_length*2)%(valuesPerChunk*2)
      let split2 = _length >= _idx * valuesPerChunk ? valuesPerChunk - (_length % valuesPerChunk) : 255;
      let bits = _chunk.slice(0,split);
      let lengthBit = _chunk.slice(split, split+2)
      let pads = _chunk.slice(split+2);

      return (
        <div className="row text-break ">
                    <div className="col">
          <div className="row" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid black 1px`, color: 'gold', backgroundColor: 'red'}}>0x{_chunk}</div>          </div>
<div className='row'>

          <div
            className="col p-0"
            style={{ border: `solid red`}}
          >
            <text className={`${styles.hex}`}>

              <span className={`${styles.padding}`}>
                {pair(_chunk).map((pair) => {
                  return <span style={{border: 'solid red 1px'}}>{pair}</span>
                })}
              </span>
            </text>
          </div>
          </div>
          </div>
        </div>
      );
    } else if (
      _length < (_idx) * valuesPerChunk &&
      _idx == chunk_count - 1 &&
      chunk_count > 1
    ) {
      let split = (_length*digits % 512);
      let bits = _chunk.substring(0,split);
      let lengthBit = _chunk.substring(split, split+digits);

      let pads = _chunk.substring((split+digits));

      return (
        <div className="row text-break ">
                    <div className="col">
          <div className="row" style={{border: 'solid green 1px', color: 'gold', backgroundColor: 'green'}}>0x{_chunk}</div> 
          <div
            className="col p-0"
            style={{ border: `solid green`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {pair(bits).map((pair) => {
                return <span style={{ border: 'solid green 1px'}}>{pair}</span>
              })}
              <span style={{ backgroundColor: "black", color: "gold"}}>{lengthBit}B</span>
              <span className={`${styles.padding}`}>
                {pair(pads).map((pair) => {
                return <span style={{ border: 'solid red 1px'}}>{pair}</span>
              })}
              </span>
            </text>
          </div>
          </div>
        </div>
      );
    } else if (_idx == chunk_count - 1 && chunk_count > 1) {
      let split = ((_length*digits) % (valuesPerChunk*digits));
      let split2 = _length >= _idx * valuesPerChunk ? valuesPerChunk - (_length % valuesPerChunk) : 255;
      let bits = _chunk.slice(0,split);
      let lengthBit = _chunk.slice(split, split+digits);
      let pads = _chunk.slice(split+digits);

      return (
        <div className="row text-break ">
                              <div className="col">
          <div className="row justify-content-center" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid ${color} 1px`, color: 'gold', backgroundColor: color}}>0x{_chunk}</div>          </div>
<div className='row'>
          <div
            className="col"
            style={{ border: `solid red`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
            {pair(bits).map((pair) => {
                return <span style={{ border: `solid ${color} 1px`}}>{pair}</span>
              })}

              <span style={{backgroundColor: 'black', color: 'gold'}}>{lengthBit}</span>
              <span className={`${styles.padding}`}>
                {pair(pads).map((pair) => {
                return <span style={{ border: `solid ${color} 1px`}}>{pair}</span>
              })}
              </span>
            </text>
          </div></div></div>
        </div>
      );
    } else if (
      _idx < chunk_count &&
      chunk_count > 1 &&
      _length > (_idx + 1) * valuesPerChunk
    ) {
      let split = valuesPerChunk - (_limit % valuesPerChunk);
      let split2 = _length < valuesPerChunk ? 255 - _length : 255;
      let bits = _chunk.slice(split);
      let delimeter = _chunk[split];
      let empties = _length < valuesPerChunk ? _chunk.slice(0, split2) : [];
      let fulls = _length < valuesPerChunk ? _chunk.slice(split2) : _chunk;
      let pads = _chunk.slice(0, split - 1);

      return (
        <div className="row text-break ">
                              <div className="col">
          <div className="row justify-content-center" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid ${color} 1px`, color: 'gold', backgroundColor: color}}>0x{_chunk}</div>          </div>
<div className='row'>
          <div
            className="col p-0"
            style={{ border: `solid  ${color}`, display: `block` }}
          >
            <text style={{ color: color }}>
              {pair(_chunk).map((pair) => {
                return <span style={{ border: `solid ${color} 1px`}}>{pair}</span>
              })}
              <span className={`${styles.empties}`}>
                {/* {empties.reverse().toString()} */}
              </span>
            </text>
          </div>
        </div></div></div>
      );
    } else if (_idx === 0 && chunk_count > 1) {
      let split = (_length*digits % 512);
      let split2 = _length < valuesPerChunk ? 255 - _length : 255;
      let bits = _chunk.substring(0,split);
      let lengthBit = _chunk.substring(split, split+digits);
      let pads = _chunk.substring(split+digits);

      return (
        <div className="row text-break ">
          <div className="col">
          <div className="row justify-content-center" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid green 1px`, color: 'gold', backgroundColor: 'green'}}>0x{_chunk}</div>          </div>
<div className='row'>
          <div
            className="col p-0"
            style={{ border: `solid green`, display: `block` }}
          >
            <text className={`${styles.hex}`}>
              {pair(bits).map((pair) => {
                return <span style={{ color: 'green', border: `solid green 1px`}}>{pair}</span>
              })}
              <span className={`${styles.delimeter}`}>{lengthBit}</span>
              <span className={`${styles.padding}`}>
                {pair(pads).map((pair) => {
                return <span style={{ border: 'solid green 1px', color: 'red'}}>{pair}</span>
              })}
              </span>
            </text>
          </div>
        </div></div></div>
      );
    } else if (props.empty) {
      return (
        <div className="row text-break ">
          <div className="col">
          <div className="row justify-content-center" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid ${color} 1px`, color: 'gold', backgroundColor: color}}>0x{_chunk}</div>          </div>
<div className='row'>
          <div
            className="col p-0"
            style={{ border: `solid ${color}`, display: `block`, color: color }}
          >
            <text className={`${styles.hex}`}>
              <span className={`${styles.empties}`}>
                {_chunk}eggs
              </span>
            </text>
          </div></div></div>
        </div>
      );
    } else if (
      _length >= _idx * valuesPerChunk &&
      _length < (_idx + 1) * valuesPerChunk &&
      _limit >= (_idx + 1) * valuesPerChunk
    ) {
      let split = ((_length*digits) % (valuesPerChunk*digits));
      // let fulls = _chunk.slice(split).reverse();
      let bits = _chunk.slice(0, split);
      let lengthBit = _chunk.substring(split, split+digits);
      let pads = _chunk.substring((split+digits))
      return (
        <div className="row text-break ">
          <div className="col">
          <div className="row justify-content-center" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid ${color} 1px`, color: 'gold', backgroundColor: 'green'}}>0x{_chunk}</div>          </div>
<div className='row'>
          <div
            className="col p-0"
            style={{ border: `solid green`, display: `block` }}
          >
            <text>
              {pair(bits).map((pair) => {
                return <span style={{color: 'green', border: 'solid green 1px'}}>{pair}</span>
              })}
              <span className={`${styles.delimeter}`}>{lengthBit}</span>
              <span className={`${styles.padding}`}>
                {pair(pads).map((pair) => {
                return <span style={{ border: 'solid red 1px'}}>{pair}</span>
              })}
              </span>
            </text>
          </div></div></div>
        </div>
      );
    } else if (_length > (_idx + 1) * valuesPerChunk) {
      return (
        <div className="row text-break ">
          <div className="col">
          <div className="row justify-content-center" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid ${color} 1px`, color: 'gold', backgroundColor: color}}>0x{_chunk}</div>          </div>
<div className='row'>
          <div
            className="col p-0"
            style={{ border: `solid ${color}`, display: `block`, color: color }}
          >
            <text>{_chunk}gofuckyaself,</text>
            {`]`}1
          </div>
        </div></div></div>
      );
    } else {
      return (
        <div className="row text-break">
          <div className="col">
          <div className="row justify-content-center" ><div className='col d-inline-flex p-0' style={{justifyContent: 'center' ,border: `solid red 2px`, color: 'gold', backgroundColor: color}}>0x{_chunk}</div>          </div>
<div className='row'>
          <div className='col p-0' style={{ color: "red", border: `solid ${color}` }}>                {pair(_chunk).map((pair) => {
                return <span style={{ border: `solid ${color} 1px`}}>{pair}</span>
              })}</div>
        </div></div></div>
      );
    }
  }
  const parsed = parseChunk();

  return parsed
}
