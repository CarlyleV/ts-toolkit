import { getMax, getMin, shuffle, sum, unique } from '@/array/index.ts';

const countItems = <T extends number | string | boolean | undefined | null>(
  array: T[],
) => {
  return array.reduce<Record<string, number>>((acc, item) => {
    const key = `${item}`;

    if (key in acc) {
      acc[key]++;
      return acc;
    }

    acc[key] = 1;
    return acc;
  }, {});
};

describe('array', () => {
  test('shuffle', () => {
    const input = [1, 2, 3];
    const output = shuffle(input);

    const isIncludes = output.some((value) => {
      return input.includes(value);
    });

    expect(isIncludes).toEqual(true);
    expect(output.length).toEqual(input.length);
  });

  test('unique', () => {
    const input = [1, 2, 2, 3];
    const output = unique(input);

    const isUnique = Object.values(countItems(output)).every((value) => {
      return value === 1;
    });

    expect(isUnique).toEqual(true);
  });

  test('sum', () => {
    const input = [1, 2, 3];
    const output = sum(input);

    expect(output).toEqual(6);
  });

  test('getMax', () => {
    const input = [1, 2, 3];
    const output = getMax(input);

    expect(output).toEqual(3);
  });

  test('getMin', () => {
    const input = [1, 2, 3];
    const output = getMin(input);

    expect(output).toEqual(1);
  });
});
