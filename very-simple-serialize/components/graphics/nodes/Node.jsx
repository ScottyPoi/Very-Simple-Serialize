import styles from "../styles/NodeStyles.module.css"

export default function Node(props) {

    const empty = props.empty ? styles.empty : styles.full
    const level = props.level === "root" ? styles.root : styles.leaf


    return (
        <div className={`${styles.node} ${level} ${empty}`}>
            {props.type}{props.idx}
        </div>
    )
}