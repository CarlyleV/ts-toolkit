/**
 * Creates a deep copy of the provided object.
 *
 * @template T
 * @param {T} obj - The object to be deep copied.
 * @returns {T} A new instance of the object that is a deep copy of the original.
 */
export const deepCopy = <T,>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj)) as T;
};
