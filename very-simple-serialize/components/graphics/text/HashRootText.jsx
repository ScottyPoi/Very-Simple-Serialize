import styles from '../styles/UintText.module.css'

export default function HashRootText(props) {
    
    let hash = props.hash
    
    return (
        <div className={`d-flex flex-row text-break  ${styles.hash}`}>

            <div className={`col`}>
            0x{hash}
            </div>
            </div>
    )
}