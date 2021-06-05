import styles from "../styles/NodeStyles.module.css";

export default function Node(props) {
  const empty = props.empty ? styles.empty : styles.full;
  const level =
    props.level === "root"
      ? styles.root
      : props.level === "branch"
      ? styles.branch
      : styles.leaf;
  const chunkIdx = props.empty
    ? ""
    : props.level === "leaf" && props.chunkIdx == props.numChunks - 1
    ? styles.green
    : props.level === "leaf" && props.limit - 1 == props.chunkIdx
    ? styles.limit
    : props.level === "leaf" && props.chunkIdx % 2 == 0
    ? styles.blue
    : props.level === "leaf" && props.chunkIdx % 2 == 1
    ? styles.red
    : styles.tree;

  return (
    <div className={`${styles.node} ${level} ${empty} ${chunkIdx}`}>
      {props.type}
      {props.idx}
    </div>
  );
}
