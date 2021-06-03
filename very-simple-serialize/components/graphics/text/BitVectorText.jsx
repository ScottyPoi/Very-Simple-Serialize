import styles from '../styles/UintText.module.css'

export default function BitVectorText(props) {
    
    let _chunk = props.chunk;
    let _length = props.length;
    let _idx = props.idx

    const chunk_count = props.num
    const split = _length % 256

    function parseChunk() {
        if (_idx === chunk_count - 1) {
        let bits = _chunk.splice(256 - split)
        let pads = _chunk.splice(0, 256 - split)
    return (
        <div className='row'>
            <p className={`${styles.padding}`}>{pads.toString()},</p>
            <p className={`${styles.hex}`}>{bits.toString()}</p>
        </div>
    )
    
    } else {
        return (
            <div className='row'>
                <div className={`${styles.hex}`}>{_chunk.toString()}</div>
            </div>
        )
    }
    }
    const parsed = parseChunk()
    return parsed
    
}