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
        acc.push(`${key}=${v}`);
      });
      return acc;
    }

    acc.push(`${key}=${params[key]}`);

    return acc;
  }, []);

  if (param.length === 0) {
    return '';
  }

  return `?${param.join('&')}`;
};

/**
 * Analyze a URL and return an object with the following properties:
 * - pathParams: an object with path parameters as key-value pairs
 * - searchParams: a URLSearchParams object representing the search parameters
 * - hash: the hash of the URL
 *
 * If the 'template' parameter is not provided, the function will return an object with 'searchParams' and 'hash' properties.
 *
 * If the 'template' parameter is provided, the function will parse the URL's pathname according to the template and return an object with 'pathParams', 'searchParams', and 'hash' properties.
 *
 * @example
 * analyzeUrl('http://localhost/1/John/12?name=John&age=12#hash') // => { pathParams: { id: '1', name: 'John', age: '12' }, searchParams: URLSearchParams { 'name' => 'John', 'age' => '12' }, hash: '#hash' }
 * analyzeUrl('http://localhost/1/John/12?name=John&age=12#hash', '/:id/:name/:age') // => { pathParams: { id: '1', name: 'John', age: '12' }, searchParams: URLSearchParams { 'name' => 'John', 'age' => '12' }, hash: '#hash' }
 *
 * @param {string | URL} url - the URL to analyze
 * @param {string} [template] - the template of the URL's pathname
 * @returns {Object} an object with the analyzed URL's properties
 */
export const analyzeUrl = (url: string | URL, template?: `/${string}`) => {
  const { pathname, searchParams, hash } = new URL(url);

  if (typeof template === 'undefined') {
    return {
      searchParams,
      hash,
    };
  }

  const splittedFormattedPathname = template.split('/');
  const splittedPathname = pathname.split('/');

  const pathParams = splittedFormattedPathname.reduce<Record<string, string>>(
    (acc, path, index) => {
      if (path.startsWith(':')) {
        acc[path.slice(1)] = splittedPathname[index];
      }

      return acc;
    },
    {},
  );

  return {
    pathParams,
    searchParams,
    hash,
  };
};
