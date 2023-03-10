import { describe, expect, test } from 'vitest';
import { findKey } from './find-key';

describe('Find Key', () => {
  test('Object is undefined', () => {
    const found = findKey('testKey', undefined);
    expect(found).toBeNull();
  });
  test('Cannot find key', () => {
    const found = findKey('testKey', { a: 1, b: 2, c: 3 });
    expect(found).toBeNull();
  });
  test('Key out of depth reach', () => {
    const found = findKey('testKey', { a: { b: { c: { testKey: 'd' } } } }, 3);
    expect(found).toBeNull();
  });
  test('Found Key at depth 3 and returned its value', () => {
    const found = findKey('testKey', { a: { b: { testKey: 'd' } } }, 3);
    expect(found).toBe('d');
  });
  test('Found key and returned its value', () => {
    const found = findKey('testKey', { testKey: 'a' });
    expect(found).toBe('a');
  });
});
