import { test, expect } from 'vitest';
import { findIndexOfMin } from './find-index-of-min';

test('exists', () => {
  expect(findIndexOfMin).toBeDefined();
});

test('returns -1 for emplty array', () => {
  expect(findIndexOfMin([])).toBe(-1);
});

test('returns index of min item', () => {
  expect(findIndexOfMin([-1, 0, 2025, 30])).toBe(0);
  expect(findIndexOfMin([122, 34, 3])).toBe(2);
  expect(findIndexOfMin([Number.NEGATIVE_INFINITY, -20, -123123])).toBe(0);
});

test('return first min of multiple occasions', () => {
  expect(findIndexOfMin([2, 1, 1, 1, 3, 1])).toBe(1);
});
