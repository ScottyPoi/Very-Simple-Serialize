import styles from '../styles/UintText.module.css'

export default function HashRootText(props) {

    
    let hash = props.hash
    let fontSize = props.displaySize ? props.displaySize : 'xx-large'

    let style = {
        border: `solid black`,
        backgroundColor: `gold`,
        display: `inline-block`,
        height: `auto`,
        width: `50%`,
        fontSize: fontSize
      }
      
    
    return (
        <div className={`d-flex flex-row text-break`} style={style}>

            <div className={`col`}>
            0x{hash}
            </div>
            </div>
    )
}