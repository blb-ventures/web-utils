import { describe, expect, test } from 'vitest';
import { groupBy } from './group-by';

describe('Group By', () => {
  test('it cannot find the inputed key', () => {
    const input = [
      { name: 'a', title: 'a' },
      { name: 'b', title: 'b' },
      { name: 'c', title: 'c' },
    ];
    const result = groupBy(input, 'notInTheObjectKey');
    expect(result).toStrictEqual({});
  });
  test('it receives an empty array', () => {
    const result = groupBy([], 'a');
    expect(result).toStrictEqual({});
  });
  test('it groups objects by a inner key value', () => {
    const input = [
      { name: 'a', title: 'a' },
      { name: 'b', title: 'b' },
      { name: 'c', title: 'c' },
    ];
    const result = groupBy(input, 'name');
    expect(result).toStrictEqual({
      a: input[0],
      b: input[1],
      c: input[2],
    });
  });
  test('it maps groupped value using a custom function', () => {
    const input = [
      { name: 'a', title: 'title a' },
      { name: 'b', title: 'title b' },
      { name: 'c', title: 'title c' },
    ];
    const result = groupBy(input, 'name', it => it.title);
    expect(result).toStrictEqual({
      a: 'title a',
      b: 'title b',
      c: 'title c',
    });
  });
});
