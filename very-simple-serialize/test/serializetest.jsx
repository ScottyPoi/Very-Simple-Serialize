// import * as booleanType from "../ssz/src/types/basic/boolean";
// import byteType from "../ssz/src/types/basic/wellKnown";
// import * as type from "../ssz/src/types/type";
import * as BigIntUintType from "../ssz/src/types/basic/BigIntUintType";
import * as NumberUintType from "../ssz/src/types/basic/NumberUintType";

// import {
//   ArrayObject,
//   ArrayObject2,
//   bigint16Type,
//   bigint64Type,
//   bigint128Type,
//   bigint256Type,
//   bitList100Type,
//   bitVector100Type,
//   byteVector100Type,
//   bytes2Type,
//   bytes4Type,
//   bytes8Type,
//   bytes32Type,
//   number16Type,
//   number32Type,
//   number64Type,
//   number16Vector6Type,
//   number16List100Type,
//   OuterObject,
//   SimpleObject,
// } from "./objects";
// import { useEffect, useState } from "react";
// import { get } from "request";

function toHexString(byteArray) {
  return Array.prototype.map
    .call(byteArray, function (byte) {
      return ("0" + (byte & 0xff).toString(16)).slice(-2);
    })
    .join("");
}

export default function SerializedTest(props) {
  // const [type, setType] = useState();
  // const [value, setValue] = useState();
  // const [expected, setExpected] = useState();
  // const [result, setResult] = useState();
  // const [testIdx, setTestIdx] = useState(0);

  // useEffect(() => {
  //   setType(testCases[testIdx].type);
  //   setValue(testCases[testIdx].type);
  //   setExpected(testCases[testIdx].type);
  //   setResult(getResult(testCases[testIdx]));
  // }, [testIdx]);

  const testCases = [
    { value: true, type: "boolean", expected: "01" },
    { value: false, type: "boolean", expected: "00" },
    {value: 0, type: "uint8", expected: "00"},
    {value: 1, type: "uint8", expected: "01"},
    {value: 255, type: "uint8", expected: "ff"},
    { value: 2 ** 8, type: "uint16", expected: "0001" },
    { value: 2 ** 12 - 1, type: "uint16", expected: "ff0f" },
    { value: 2 ** 12, type: "uint16", expected: "0010" },
    { value: 2 ** 16 - 1, type: "uint16", expected: "ffff" },
    { value: 2 ** 16, type: "uint32", expected: "00000100" },
    { value: 2 ** 28 - 1, type: "uint32", expected: "ffffff0f" },
    { value: 2 ** 28, type: "uint32", expected: "00000010" },
    { value: 2 ** 32 - 1, type: "uint32", expected: "ffffffff" },
    { value: 2 ** 32, type: "uint64", expected: "0000000001000000" },
    { value: 2 ** 52 - 1, type: "uint64", expected: "ffffffffffff0f00" },
    { value: 2 ** 32, type: "uint64", expected: "0000000001000000" },
    { value: 2 ** 52 - 1, type: "uint64", expected: "ffffffffffff0f00" },
    // { value: Infinity, type: "uint32", expected: "ffffffffffffffff" },
    { value: 0x01n, type: "uint64", expected: "0100000000000000" },
    {
      value: 0x1000000000000000n,
      type: "uint64",
      expected: "0000000000000010",
    },
    {
      value: 0xffffffffffffffffn,
      type: "uint64",
      expected: "ffffffffffffffff",
    },
    {
      value: 0xffffffffffffffffffffffffffffffffn,
      type: "uint128",
      expected: "ffffffffffffffffffffffffffffffff",
    },
    {
      value: 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffn,
      type: "uint256",
      expected: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
    },
    {value: BigInt(0xefbeadde), type: "uint32", expected: "deadbeef"},
    {value: BigInt(0xdeadbeef), type: "uint32", expected: "deadbeef"},
    // {value: {b: 0, a: 0}, type: SimpleObject, expected: "000000"},
    // {value: {b: 2, a: 1}, type: SimpleObject, expected: "020001"},
    // {value: {v: 3, subV: {v: 6}}, type: OuterObject, expected: "030600"},
    // {
    //   value: {
    //     v: [
    //       {b: 2, a: 1},
    //       {b: 4, a: 3},
    //     ],
    //   },
    //   type: ArrayObject,
    //   expected: "04000000020001040003",
    // },
    // {
    //   value: [
    //     {v: 3, subV: {v: 6}},
    //     {v: 5, subV: {v: 7}},
    //   ],
    //   type: ArrayObject2,
    //   expected: "030600050700",
    // },
    // {value: [], type: ArrayObject2, expected: ""},
  ];

  let results = [];

  for (const { type, value, expected } of testCases) {
    let array = new Uint8Array(32);
    let byteLength =
      type == "boolean"
        ? 1
        : type == "uint8"
        ? 1
        : type == "uint16"
        ? 2
        : type == "uint32"
        ? 4
        : type == "uint64"
        ? 8
        : type == "uint128"
        ? 16
        : 32


    let actual =
      type == "boolean"
        ? NumberUintType.serialize(value, array, 0, byteLength)
        : type == "uint8"
        ? NumberUintType.serialize(value, array, 0, byteLength)
        : type == "uint16"
        ? NumberUintType.serialize(value, array, 0, byteLength)
        : BigIntUintType.serialize(value, array, 0, byteLength);

    let result = {
      type: type,
      value: value.toString(16),
      result: actual,
      expected: expected,
    };
    results.push(result);
  }

  // function getResult(testCase) {
  //   let array = newUint8Array(32);
  //   let actual = NumberUintType.serialize(testCase.value, array, 0, 2);
  //   let result = {
  //     type: type,
  //     value: testCase.value,
  //     actual: actual,
  //     expected: testCase.expected,
  //   };
  //   return result;
  // }

  // function printResults() {

  //   for (let i=0; i<testCases.length; i++) {
  //     setTestIdx(i);
  //     let testCase = testCases[testIdx];
  //     let result = getResult(testCase);
  //     return <div>{result.type}
  //     {result.value}
  //     {result.expected}
  //     {result.actual}
  //     </div>;
  //   }
  // }

  return (
    <>
      {results.map(({ type, value, expected, result }) => {
        return (
          <div className='row'>
            <div className='col'>type: {type}</div>
            <div className='col'>value: {value}</div>
            <div className='col'>expected: {expected}</div>
            <div className='col'>result: {toHexString(result)}</div>
            <div className='col'>{expected === toHexString(result) ? "valid" : "ERROR_SERIALIZATION_ERROR"}</div>
          </div>
        );
      })}
    </>
  );
}
