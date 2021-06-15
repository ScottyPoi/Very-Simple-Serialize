import styles from "../styles/NodeStyles.module.css";

export default function Node(props) {
  const empty = props.empty ? styles.empty : styles.full;
  const level =
  props.level === 'merkle'
  ? styles.merkle
:    props.level === "root"
      ? styles.root
      :props.level === "length"
      ? styles.length
      : props.level === "branch"
      ? styles.branch
      : props.level === 'limit'
      ? styles.limit 
      : styles.leaf;
  const chunkIdx = props.empty
    ? ""
    : props.level === 'demo'
    ? styles.demo
    : props.level === "leaf" && props.chunkIdx == props.numChunks - 1
    ? styles.green
    : props.level === "leaf" && props.chunkIdx > props.numChunks - 1
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
