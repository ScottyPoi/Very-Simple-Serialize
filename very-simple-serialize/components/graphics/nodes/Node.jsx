import styles from "../styles/NodeStyles.module.css"

export default function Node(props) {

    const empty = props.empty ? styles.empty : styles.full


    return (
        <div className={`${styles.node} ${empty}`}>
            {props.type}{props.idx}
        </div>
    )
}