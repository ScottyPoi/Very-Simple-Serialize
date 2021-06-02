// Adapted from https://github.com/prysmaticlabs/prysm/blob/master/shared/ssz/encode_test.go#L296
import  BigIntUintType  from "../ssz/src/types/basic/uint";

import  BitVectorType  from "../ssz/src/types/composite/bitVector";

import  BitListType  from "../ssz/src/types/composite/bitList";

import  ByteVectorType  from "../ssz/src/types/composite/byteVector";

import ContainerType  from "../ssz/src/types/composite/container";

import  NumberUintType  from "../ssz/src/types/basic/NumberUintType";

import  byteType  from "../ssz/src/types/basic/wellKnown";

import  ListType  from "../ssz/src/types/composite/list";

import  VectorType  from "../ssz/src/types/composite/vector";

import  BooleanType  from "../ssz/src/types/basic/boolean";

export const bytes2Type = <ByteVectorType
  length={2} />;

export const bytes4Type =  <ByteVectorType
  length={4}/>;

export const bytes8Type = <ByteVectorType
  length={8}/>;

export const bytes32Type = <ByteVectorType
  length={32}/>;

export const byteVector100Type = <ByteVectorType length={100 }/>;

export const bitList100Type = <BitListType limit={100 }/>;

export const bitVector100Type = <BitVectorType length={100 }/>;

export const bigint16Type = <BigIntUintType byteLength={2 }/>;

export const bigint64Type = <BigIntUintType byteLength={8 }/>;

export const bigint128Type = <BigIntUintType byteLength={16 }/>;

export const bigint256Type = <BigIntUintType byteLength={32 }/>;

export const number16Type = <NumberUintType byteLength={2 }/>;

export const number32Type = <NumberUintType byteLength={4 }/>;

export const number64Type = <NumberUintType byteLength={8 }/>;

export const number16Vector6Type = <VectorType
  elementType={number16Type}
  length={6}/>;

export const number16List100Type = <ListType
  elementType={number16Type}
  limit={100}
/>;

export const bigint16List100Type = <ListType
  elementType={bigint16Type}
  limit={100}
/>;

export const SimpleObject = <ContainerType
  fields={{
    b: number16Type,
    a: byteType,
  }
}/>;

export const VariableSizeSimpleObject = <ContainerType
  fields={{
    b: number16Type,
    a: byteType,
    list: number16List100Type,
  }}/>;

export const CamelCaseFieldObject = <ContainerType
  fields={{
    someValue: <NumberUintType byteLength={4}/>,
    someOtherValue: <BooleanType/>,
  }}/>;

export const ComplexCamelCaseFieldObject = <ContainerType
  fields = {
    {someValue: <NumberUintType byteLength={4}/>,
    someOtherValue: <BooleanType/>,
    container: CamelCaseFieldObject,}
  }/>;

export const InnerObject = <ContainerType
  fields={{
    v: number16Type,
  }}/>;

export const OuterObject = <ContainerType
  fields={{
    v: byteType,
    subV: InnerObject,
  }}/>;

export const ArrayObject = <ContainerType
  fields={{
    v: <ListType
      elementType={SimpleObject}
      limit={100}
    />,
  }}/>;

export const ArrayObject2 = <ListType
  elementType={OuterObject}
  limit={100}
/>;
