import type { TestFunctionDescribe } from '@/types/jest.ts';
import { analyzeUrl, generateSearchParams, generateUrl } from '@/url/index.ts';

const testDescribes: TestFunctionDescribe[] = [
  {
    name: 'generateUrl',
    function: generateUrl,
    cases: [
      {
        name: 'no params',
        args: ['http://localhost', {}],
        expected: 'http://localhost',
      },
      {
        name: 'with one param',
        args: ['http://localhost/:id', { id: '1' }],
        expected: 'http://localhost/1',
      },
      {
        name: 'with multiple params',
        args: [
          'http://localhost/:id/:name/:age',
          { id: '1', name: 'John', age: 12 },
        ],
        expected: 'http://localhost/1/John/12',
      },
    ],
  },
  {
    name: 'generateSearchParams',
    function: generateSearchParams,
    cases: [
      {
        name: 'no params',
        args: [{}],
        expected: '',
      },
      {
        name: 'with one param',
        args: [{ id: '1' }],
        expected: '?id=1',
      },
      {
        name: 'with multiple params',
        args: [
          { id: '1', age: 12, hobbies: ['reading', 'swimming', 34, undefined] },
        ],
        expected: '?id=1&age=12&hobbies=reading&hobbies=swimming&hobbies=34',
      },
      {
        name: 'with undefined param',
        args: [{ id: '1', name: undefined }],
        expected: '?id=1',
      },
    ],
  },
  {
    name: 'analyzeUrl',
    function: analyzeUrl,
    cases: [
      {
        name: 'with hash',
        args: ['http://localhost/1/John/12#hash'],
        expected: {
          searchParams: new URLSearchParams(),
          hash: '#hash',
        },
      },

      {
        name: 'with search params',
        args: ['http://localhost/1/John/12?name=John&age=12'],
        expected: {
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: '',
        },
      },
      {
        name: 'with path params',
        args: ['http://localhost/test/1/John/12', '/test/:id/:name/:age'],
        expected: {
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams(),
          hash: '',
        },
      },
      {
        name: 'with path params and search params',
        args: [
          'http://localhost/1/John/12?name=John&age=12',
          '/:id/:name/:age',
        ],
        expected: {
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: '',
        },
      },
      {
        name: 'with path params and hash',
        args: ['http://localhost/1/John/12#hash', '/:id/:name/:age'],
        expected: {
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams(),
          hash: '#hash',
        },
      },
      {
        name: 'with path params and search params and hash',
        args: [
          'http://localhost/1/John/12?name=John&age=12#hash',
          '/:id/:name/:age',
        ],
        expected: {
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: '#hash',
        },
      },
    ],
  },
];

describe('url', () => {
  testDescribes.forEach((d) => {
    describe(d.name, () => {
      d.cases.forEach((c) => {
        test(c.name, () => {
          expect(d.function(...(c.args as []))).toEqual(c.expected);
        });
      });
    });
  });
});
