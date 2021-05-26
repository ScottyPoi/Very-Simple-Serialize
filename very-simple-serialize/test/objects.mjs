// Adapted from https://github.com/prysmaticlabs/prysm/blob/master/shared/ssz/encode_test.go#L296
import { BigIntUintType } from "../e-z-serialize/ssz/src/types/basic/uint.js";

import { BitVectorType } from "../e-z-serialize/ssz/src/types/composite/bitVector.js";

import { BitListType } from "../e-z-serialize/ssz/src/types/composite/bitList.js";

import { ByteVectorType } from "../e-z-serialize/ssz/src/types/composite/byteVector.js";

import { ContainerType } from "../e-z-serialize/ssz/src/types/composite/container.js";

import { NumberUintType } from "../e-z-serialize/ssz/src/types/basic/uint.js";

import { byteType } from "../e-z-serialize/ssz/src/types/basic/wellKnown.js";

import { ListType } from "../e-z-serialize/ssz/src/types/composite/list.js";

import { VectorType } from "../e-z-serialize/ssz/src/types/composite/vector.js";

import { BooleanType } from "../e-z-serialize/ssz/src/types/basic/boolean.js";

export const bytes2Type = new ByteVectorType({
  length: 2,
});

export const bytes4Type = new ByteVectorType({
  length: 4,
});

export const bytes8Type = new ByteVectorType({
  length: 8,
});

export const bytes32Type = new ByteVectorType({
  length: 32,
});

export const byteVector100Type = new ByteVectorType({ length: 100 });

export const bitList100Type = new BitListType({ limit: 100 });

export const bitVector100Type = new BitVectorType({ length: 100 });

export const bigint16Type = new BigIntUintType({ byteLength: 2 });

export const bigint64Type = new BigIntUintType({ byteLength: 8 });

export const bigint128Type = new BigIntUintType({ byteLength: 16 });

export const bigint256Type = new BigIntUintType({ byteLength: 32 });

export const number16Type = new NumberUintType({ byteLength: 2 });

export const number32Type = new NumberUintType({ byteLength: 4 });

export const number64Type = new NumberUintType({ byteLength: 8 });

export const number16Vector6Type = new VectorType({
  elementType: number16Type,
  length: 6,
});

export const number16List100Type = new ListType({
  elementType: number16Type,
  limit: 100,
});

export const bigint16List100Type = new ListType({
  elementType: bigint16Type,
  limit: 100,
});

export const SimpleObject = new ContainerType({
  fields: {
    b: number16Type,
    a: byteType,
  },
});

export const VariableSizeSimpleObject = new ContainerType({
  fields: {
    b: number16Type,
    a: byteType,
    list: number16List100Type,
  },
});

export const CamelCaseFieldObject = new ContainerType({
  fields: {
    someValue: new NumberUintType({ byteLength: 4 }),
    someOtherValue: new BooleanType(),
  },
});

export const ComplexCamelCaseFieldObject = new ContainerType({
  fields: {
    someValue: new NumberUintType({ byteLength: 4 }),
    someOtherValue: new BooleanType(),
    container: CamelCaseFieldObject,
  },
});

export const InnerObject = new ContainerType({
  fields: {
    v: number16Type,
  },
});

export const OuterObject = new ContainerType({
  fields: {
    v: byteType,
    subV: InnerObject,
  },
});

export const ArrayObject = new ContainerType({
  fields: {
    v: new ListType({
      elementType: SimpleObject,
      limit: 100,
    }),
  },
});

export const ArrayObject2 = new ListType({
  elementType: OuterObject,
  limit: 100,
});
