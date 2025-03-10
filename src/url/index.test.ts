import type { TestFunctionDescribe } from '@/types/jest.ts';
import { analyzeUrl, extractHash, extractPathname, extractSearchParams, generateSearchParams, generateUrl } from '@/url/index.ts';

const testDescribes: TestFunctionDescribe[] = [
  {
    name: 'extractPathname',
    function: extractPathname,
    cases: [
      {
        name: 'url',
        args: ['http://localhost:3000/test/1/John/12'],
        expected: '/test/1/John/12',
      },
      {
        name: 'url with search params',
        args: ['http://localhost:3000/test/1/John/12?name=John&age=12'],
        expected: '/test/1/John/12',
      },
      {
        name: 'url with hash',
        args: ['http://localhost:3000/test/1/John/12#hash'],
        expected: '/test/1/John/12',
      },
      {
        name: 'url with search params and hash',
        args: ['http://localhost:3000/test/1/John/12?name=John&age=12#hash'],
        expected: '/test/1/John/12',
      },
      {
        name: 'pathname',
        args: ['/test/1/John/12'],
        expected: '/test/1/John/12',
      },
      {
        name: 'pathname with search params',
        args: ['/test/1/John/12?name=John&age=12'],
        expected: '/test/1/John/12',
      },
      {
        name: 'pathname with hash',
        args: ['/test/1/John/12#hash'],
        expected: '/test/1/John/12',
      },
      {
        name: 'pathname with search params and hash',
        args: ['/test/1/John/12?name=John&age=12#hash'],
        expected: '/test/1/John/12',
      }
    ]
  },
  {
    name: 'extractSearchParams',
    function: extractSearchParams,
    cases: [
      {
        name: 'url',
        args: ['http://localhost:3000/test/1/John/12'],
        expected: new URLSearchParams(),
      },{
        name: 'url with search params',
        args: ['http://localhost:3000/test/1/John/12?name=John&age=12'],
        expected: new URLSearchParams('name=John&age=12'),
      },
      {
        name: 'url with hash',
        args: ['http://localhost:3000/test/1/John/12#hash'],
        expected: new URLSearchParams(),
      },
      {
        name: 'url with search params and hash',
        args: ['http://localhost:3000/test/1/John/12?name=John&age=12#hash'],
        expected: new URLSearchParams('name=John&age=12'),
      },
      {
        name: 'pathname',
        args: ['/test/1/John/12'],
        expected: new URLSearchParams(),
      },
      {
        name: 'pathname with search params',
        args: ['/test/1/John/12?name=John&age=12'],
        expected: new URLSearchParams('name=John&age=12'),
      },
      {
        name: 'pathname with hash',
        args: ['/test/1/John/12#hash'],
        expected: new URLSearchParams(),
      },
      {
        name: 'pathname with search params and hash',
        args: ['/test/1/John/12?name=John&age=12#hash'],
        expected: new URLSearchParams('name=John&age=12'),
      }
    ]
  },
  {
    name: 'extractHash',
    function: extractHash,
    cases: [
      {
        name: 'url',
        args: ['http://localhost:3000/test/1/John/12'],
        expected: undefined,
      },
      {
        name: 'url with search params',
        args: ['http://localhost:3000/test/1/John/12?name=John&age=12'],
        expected: undefined,
      },
      {
        name: 'url with hash',
        args: ['http://localhost:3000/test/1/John/12#hash'],
        expected: 'hash',
      },
      {
        name: 'url with search params and hash',
        args: ['http://localhost:3000/test/1/John/12?name=John&age=12#hash'],
        expected: 'hash',
      },
      {
        name: 'pathname',
        args: ['/test/1/John/12'],
        expected: undefined,
      },
      {
        name: 'pathname with search params',
        args: ['/test/1/John/12?name=John&age=12'],
        expected: undefined,
      },
      {
        name: 'pathname with hash',
        args: ['/test/1/John/12#hash'],
        expected: 'hash',
      },
      {
        name: 'pathname with search params and hash',
        args: ['/test/1/John/12?name=John&age=12#hash'],
        expected: 'hash',
      }
    ]
  },
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
        name: 'url with hash',
        args: ['http://localhost/1/John/12#hash'],
        expected: {
          pathname: '/1/John/12',
          searchParams: new URLSearchParams(),
          hash: 'hash',
        },
      },

      {
        name: 'url with search params',
        args: ['http://localhost/1/John/12?name=John&age=12'],
        expected: {
          pathname: '/1/John/12',
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: undefined,
        },
      },
      {
        name: 'url with path params',
        args: ['http://localhost/test/1/John/12', '/test/:id/:name/:age'],
        expected: {
          pathname: '/test/1/John/12',
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams(),
          hash: undefined,
        },
      },
      {
        name: 'url with path params and search params',
        args: [
          'http://localhost/1/John/12?name=John&age=12',
          '/:id/:name/:age',
        ],
        expected: {
          pathname: '/1/John/12',
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: undefined,
        },
      },
      {
        name: 'url with path params and hash',
        args: ['http://localhost/1/John/12#hash', '/:id/:name/:age'],
        expected: {
          pathname: '/1/John/12',
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams(),
          hash: 'hash',
        },
      },
      {
        name: 'url with path params and search params and hash',
        args: [
          'http://localhost/1/John/12?name=John&age=12#hash',
          '/:id/:name/:age',
        ],
        expected: {
          pathname: '/1/John/12',
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: 'hash',
        },
      },
      {
        name: 'pathname',
        args: ['/1/John/12'],
        expected: {
          pathname: '/1/John/12',
          searchParams: new URLSearchParams(),
          hash: undefined,
        },
      },
      {
        name: 'pathname with search params',
        args: ['/1/John/12?name=John&age=12'],
        expected: {
          pathname: '/1/John/12',
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: undefined,
        }
      },
      {
        name: 'pathname with hash',
        args: ['/1/John/12#hash'],
        expected: {
          pathname: '/1/John/12',
          searchParams: new URLSearchParams(),
          hash: 'hash',
        }
      },
      {
        name: 'pathname with search params and hash',
        args: ['/1/John/12?name=John&age=12#hash'],
        expected: {
          pathname: '/1/John/12',
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: 'hash',
        }
      },
      {
        name: 'pathname with path params',
        args: ['/test/1/John/12', '/test/:id/:name/:age'],
        expected: {
          pathname: '/test/1/John/12',
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams(),
          hash: undefined,
        }
      },
      {
        name: 'pathname with path params and search params and hash',
        args: ['/test/1/John/12?name=John&age=12#hash', '/test/:id/:name/:age'],
        expected: {
          pathname: '/test/1/John/12',
          pathParams: { id: '1', name: 'John', age: '12' },
          searchParams: new URLSearchParams('name=John&age=12'),
          hash: 'hash',
        }
      }
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
