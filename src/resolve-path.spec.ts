import { describe, expect, test } from 'vitest';
import { resolvePath } from './resolve-path';

describe('Resolve Object Path', () => {
  test('it resolves the path for depth 1 successfully', () => {
    const result = resolvePath({ a: 'b' }, 'a', 'default');
    expect(result).toBe('b');
  });
  test('it resolves the path for depth 2 successfully', () => {
    const result = resolvePath({ a: { b: 'c' } }, 'a.b', 'default');
    expect(result).toBe('c');
  });
  test('it fallbacks to the default value when path is not resolved', () => {
    const result = resolvePath({ a: { b: 'c' } }, 'a.b.c', 'default');
    expect(result).toBe('default');
  });
});
