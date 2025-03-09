/**
 * Shuffles an array.
 *
 * @example
 * const input = [1, 2, 3];
 * const output = shuffle(input);
 * console.log(output); // [2, 3, 1]
 *
 * @param {T[]} array - The input array.
 * @returns {T[]} A new array with the shuffled elements.
 * @template T
 */
export const shuffle = <T>(array: T[]) => {
  return array.toSorted(() => Math.random() - 0.5);
};

/**
 * Removes duplicate elements from an array. Doesn't support object and array.
 *
 * @example
 * const input = [1, 2, 2, 3];
 * const output = unique(input);
 * console.log(output); // [1, 2, 3]
 *
 * @param {T[]} array - The input array.
 * @returns {T[]} A new array with the duplicated elements removed.
 * @template T
 */
export const unique = <T extends number | string | boolean | undefined | null>(
  array: T[],
) => {
  return Array.from(new Set(array));
};

/**
 * Calculate the sum of an array of numbers.
 *
 * @example
 * const input = [1, 2, 3];
 * const output = sum(input);
 * console.log(output); // 6
 *
 * @param {number[]} array - The input array of numbers.
 * @returns {number} The sum of the numbers in the array.
 */
export const sum = (array: number[]) => array.reduce((a, b) => a + b, 0);

/**
 * Get the maximum value of an array of numbers.
 *
 * @example
 * const input = [1, 2, 3];
 * const output = getMax(input);
 * console.log(output); // 3
 *
 * @param {number[]} array - The input array of numbers.
 * @returns {number} The maximum value of the numbers in the array.
 */
export const getMax = (array: number[]) => Math.max(...array);

/**
 * Get the minimum value of an array of numbers.
 *
 * @example
 * const input = [1, 2, 3];
 * const output = getMin(input);
 * console.log(output); // 1
 *
 * @param {number[]} array - The input array of numbers.
 * @returns {number} The minimum value of the numbers in the array.
 */
export const getMin = (array: number[]) => Math.min(...array);
