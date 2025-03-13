const pathNameRegex =
  /(?<=\w)\/.*(?=\?)|(?<=\w)\/.*(?=#)|^\/.*(?=\?)|^\/.*(?=#)|^\/.*|(?<=\w)\/.*/;
const searchParamsRegex = /(?<=\?).*(?=#)|(?<=\?).*/;
const hashRegex = /(?<=#).*/;

/**
 * Extracts the pathname from a given URL.
 *
 * @example
 * extractPathname('http://example.com/pathname?search=test#hash') // => '/pathname'
 * extractPathname('http://example.com/pathname') // => '/pathname'
 * extractPathname('/pathname?search=test#hash') // => '/pathname'
 * extractPathname('/pathname') // => '/pathname'
 *
 * @param {string} url - The URL from which to extract the pathname.
 * @returns {string | undefined} The extracted pathname. Returns undefined if no pathname is found.
 */
export const extractPathname = (url: string) => {
  const matched = url.match(pathNameRegex)?.[0];
  return matched;
};

/**
 * Extracts the search parameters from a given URL.
 *
 * @example
 * extractSearchParams('http://example.com/pathname?search=test#hash') // => URLSearchParams { 'search' => 'test' }
 * extractSearchParams('http://example.com/pathname?search=test') // => URLSearchParams { 'search' => 'test' }
 * extractSearchParams('/pathname?search=test#hash') // => URLSearchParams { 'search' => 'test' }
 * extractSearchParams('/pathname?search=test') // => URLSearchParams { 'search' => 'test' }
 *
 * @param {string} url - The URL from which to extract the search parameters.
 * @returns {URLSearchParams} The extracted search parameters.
 */
export const extractSearchParams = (url: string) => {
  const matched = url.match(searchParamsRegex)?.[0];

  return new URLSearchParams(matched);
};

/**
 * Extracts the hash fragment from a given URL.
 *
 * @example
 * extractHash('http://example.com/pathname?search=test#hash') // => 'hash'
 * extractHash('http://example.com/pathname#hash') // => 'hash'
 * extractHash('/pathname?search=test#hash') // => 'hash'
 * extractHash('/pathname#hash') // => 'hash'
 *
 * @param {string} url - The URL from which to extract the hash fragment.
 * @returns {string | undefined} The extracted hash fragment. Returns undefined if no hash fragment is found.
 */
export const extractHash = (url: string) => {
  const matched = url.match(hashRegex)?.[0];
  return matched;
};

/**
 * Replace any :key placeholders in a given URL with the corresponding values in the given object.
 *
 * @example
 * generateUrl('http://localhost:3000/:id', { id: '1' }) // => 'http://localhost:3000/1'
 * generateUrl('http://localhost:3000/:id', { id: 1 }) // => 'http://localhost:3000/1'
 *
 * @param {string} template - the URL to replace placeholders in
 * @param {Object<string, string|number>} params - the object to take values from
 * @returns {string} the URL with placeholders replaced
 */
export const generateUrl = (
  template: string,
  params: Record<string, string | number>,
) => {
  return template.replace(
    /:(\w+)/g,
    (_, key: string | number) => `${params[key]}`,
  );
};

/**
 * Generate search parameters from a given object.
 *
 * @example
 * generateSearchParams({ id: '1', name: 'John' }) // => '?id=1&name=John'
 * generateSearchParams({ id: '1', name: 'John', age: undefined }) // => '?id=1&name=John'
 * generateSearchParams({ id: '1', name: 'John', hobbies: ['reading', 'swimming'] }) // => '?id=1&name=John&hobbies=reading&hobbies=swimming'
 *
 * @param {Object} params - an object where each key is the name of a search parameter and each value is the value of that parameter.
 * The value can be a string, number, or an array of strings and numbers.
 * If the value is an array, the key will be repeated with each value in the array.
 * If the value is undefined, the key will be ignored.
 * @returns {string} the search parameters as a string
 */
export const generateSearchParams = <
  T extends Record<
    string,
    string | number | undefined | (number | string | undefined)[]
  > = Record<
    string,
    string | number | undefined | (number | string | undefined)[]
  >,
>(
  params: T,
) => {
  const param = Object.keys(params).reduce<string[]>((acc, key) => {
    if (typeof params[key] === 'undefined') {
      return acc;
    }

    if (Array.isArray(params[key])) {
      params[key].forEach((v) => {
        if (typeof v === 'undefined') {
          return;
        }
        acc.push(`${key}=${encodeURI(`${v}`)}`);
      });
      return acc;
    }

    acc.push(`${key}=${encodeURI(`${params[key]}`)}`);

    return acc;
  }, []);

  if (param.length === 0) {
    return '';
  }

  return `?${param.join('&')}`;
};

/**
 * Analyzes a given URL and extracts its pathname, search parameters, and hash fragment.
 * Optionally, it can also extract path parameters based on a provided template.
 *
 * @example
 * analyzeUrl('http://example.com/pathname?search=test#hash')
 * => { pathname: '/pathname', searchParams: URLSearchParams { 'search' => 'test' }, hash: 'hash' }
 *
 * analyzeUrl('http://example.com/pathname?search=test#hash', '/:id')
 * => { pathname: '/pathname', pathParams: { id: 'pathname' }, searchParams: URLSearchParams { 'search' => 'test' }, hash: 'hash' }
 *
 * @param {string} url - The URL to analyze.
 * @param {string} [template] - An optional template to extract path parameters.
 * @returns {Object} An object containing the extracted pathname, search parameters, hash fragment, and optionally path parameters.
 */
export const analyzeUrl = (url: string, template?: `/${string}`) => {
  const pathname = extractPathname(url);
  const searchParams = extractSearchParams(url);
  const hash = extractHash(url);

  if (typeof template === 'undefined' || typeof pathname === 'undefined') {
    return {
      pathname,
      searchParams,
      hash,
    };
  }

  const splittedTemplate = template.split('/');
  const splittedPathname = pathname.split('/');

  const pathParams = splittedTemplate.reduce<Record<string, string>>(
    (acc, path, index) => {
      if (path.startsWith(':')) {
        acc[path.slice(1)] = splittedPathname[index];
      }

      return acc;
    },
    {},
  );

  return {
    pathname,
    pathParams,
    searchParams,
    hash,
  };
};
