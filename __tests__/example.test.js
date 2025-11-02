import { add } from '../src/utils/example';

describe('add function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  test('adds 0 + 0 to equal 0', () => {
    expect(add(0, 0)).toBe(0);
  });

  test('adds negative numbers correctly', () => {
    expect(add(-1, -2)).toBe(-3);
  });

  test('adds positive and negative numbers correctly', () => {
    expect(add(5, -3)).toBe(2);
  });
});
