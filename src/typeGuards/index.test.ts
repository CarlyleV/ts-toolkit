import {
  isArray,
  isExistent,
  isNull,
  isUndefined,
} from '@/typeGuards/index.ts';
import type { TestFunctionDescribe } from '@/types/jest.ts';

const testDescribes: TestFunctionDescribe[] = [
  {
    name: 'isUndefined',
    function: isUndefined,
    cases: [
      {
        name: 'undefined',
        args: undefined,
        expected: true,
      },
      {
        name: 'null',
        args: null,
        expected: false,
      },
      {
        name: 'string',
        args: 'string',
        expected: false,
      },
      {
        name: 'number',
        args: 1,
        expected: false,
      },
      {
        name: 'object',
        args: {},
        expected: false,
      },
      {
        name: 'array',
        args: [],
        expected: false,
      },
      {
        name: 'function',
        args: () => {},
        expected: false,
      },
      {
        name: 'symbol',
        args: Symbol(),
        expected: false,
      },
      {
        name: 'bigint',
        args: 1n,
        expected: false,
      },
    ],
  },
  {
    name: 'isNull',
    function: isNull,
    cases: [
      {
        name: 'undefined',
        args: undefined,
        expected: false,
      },
      {
        name: 'null',
        args: null,
        expected: true,
      },
      {
        name: 'string',
        args: 'string',
        expected: false,
      },
      {
        name: 'number',
        args: 1,
        expected: false,
      },
      {
        name: 'object',
        args: {},
        expected: false,
      },
      {
        name: 'array',
        args: [],
        expected: false,
      },
      {
        name: 'function',
        args: () => {},
        expected: false,
      },
      {
        name: 'symbol',
        args: Symbol(),
        expected: false,
      },
      {
        name: 'bigint',
        args: 1n,
        expected: false,
      },
    ],
  },
  {
    name: 'isExistent',
    function: isExistent,
    cases: [
      {
        name: 'undefined',
        args: undefined,
        expected: false,
      },
      {
        name: 'null',
        args: null,
        expected: false,
      },
      {
        name: 'string',
        args: 'string',
        expected: true,
      },
      {
        name: 'number',
        args: 1,
        expected: true,
      },
      {
        name: 'object',
        args: {},
        expected: true,
      },
      {
        name: 'array',
        args: [],
        expected: true,
      },
      {
        name: 'function',
        args: () => {},
        expected: true,
      },
      {
        name: 'symbol',
        args: Symbol(),
        expected: true,
      },
      {
        name: 'bigint',
        args: 1n,
        expected: true,
      },
    ],
  },
  {
    name: 'isArray',
    function: isArray,
    cases: [
      {
        name: 'undefined',
        args: undefined,
        expected: false,
      },
      {
        name: 'null',
        args: null,
        expected: false,
      },
      {
        name: 'string',
        args: 'string',
        expected: false,
      },
      {
        name: 'number',
        args: 1,
        expected: false,
      },
      {
        name: 'object',
        args: {},
        expected: false,
      },
      {
        name: 'array',
        args: [],
        expected: true,
      },
      {
        name: 'function',
        args: () => {},
        expected: false,
      },
      {
        name: 'symbol',
        args: Symbol(),
        expected: false,
      },
      {
        name: 'bigint',
        args: 1n,
        expected: false,
      },
    ],
  },
];

describe('type guards', () => {
  testDescribes.forEach((d) => {
    describe(d.name, () => {
      d.cases.forEach((c) => {
        test(c.name, () => {
          expect(d.function(c.args)).toEqual(c.expected);
        });
      });
    });
  });
});
