export default function DisplayBitVector(props) {
  let serialized = props.serialized;
  let values = props.values;
  let length = props.length;

  function toHexString(byteArray) {
    return Array.prototype.map
      .call(byteArray, function (byte) {
        return ("0" + (byte & 0xff).toString(16)).slice(-2);
      })
      .join("");
  }

//   const chunks = toHexString(serialized[0]);

//   const fullchunks = serialiized.length
//   totalschunks = getnextpoweroftwo(fullchunks)
//   emptychunks = totalschunks - fullchunks
//   //   5 nodes needss 8 leafs

//   total leafs = totalschunkns
//   total nodes = leafs * 2 - 1

//   branch nodes = leafts * 2 - 2 - leafs
//   root = gethashtreeroot(serialized)
//   treelevels = 3 + getnextpoweroftwo(totalshulnks)//8


  return (
    <>
      <div className="overflow-auto row">
        <div className="col">
          <div className="row"></div>
          <div className="row"></div>
          <div className="row"></div>
          <div className="row">
            {serialized.map((chunk) => {
                return (
                     <div className="col chunkNode"></div>
                )
            })}
           
          </div>
        </div>
      </div>
      <div>
        serialized:{" "}
        {serialized.map((chunk, idx) => {
          return (
            <div className="overflow-auto">
              Chunk {idx}: 0x
              {chunk.map((bit) => {
                return bit;
              })}
            </div>
          );
        })}
      </div>

      <br />
      <p>
        obj: BitVector[{length}] = [
        {values.map((value) => {
          return value ? "true, " : "false, ";
        })}
        ]
      </p>
    </>
  );
}
