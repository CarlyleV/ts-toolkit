/**
 * Checks if the given value is of type `undefined`.
 *
 * @param value - The value to be checked.
 * @returns `true` if the value is `undefined`, `false` otherwise.
 */
export const isUndefined = (value: unknown): value is undefined =>
  typeof value === 'undefined';

/**
 * Checks if the given value is of type `null`.
 *
 * @param value - The value to be checked.
 * @returns `true` if the value is `null`, `false` otherwise.
 */
export const isNull = (value: unknown): value is null => value === null;

/**
 * Checks if the given value is neither `null` nor `undefined`.
 *
 * @param value - The value to be checked.
 * @returns `true` if the value is neither `null` nor `undefined`, `false` otherwise.
 */

export const isExistent = <T>(value: T): value is NonNullable<T> =>
  !isNull(value) && !isUndefined(value);

/**
 * Checks if the given value is an array.
 *
 * @param value - The value to be checked.
 * @returns `true` if the value is an array, `false` otherwise.
 */
export const isArray = <T>(value: unknown): value is T[] =>
  Array.isArray(value);
