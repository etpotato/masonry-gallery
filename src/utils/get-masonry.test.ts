import { test, expect } from 'vitest';
import { getMasonry } from './get-masonry';

test('exists', () => {
  expect(getMasonry).toBeDefined();
});

test('fills the smallest column', () => {
  expect(
    getMasonry({
      columnHeights: [0, 20],
      xGap: 0,
      yGap: 0,
      containerWidth: 200,
      images: [{ width: 200, height: 200 }],
    }),
  ).toEqual({
    grid: [{ image: { width: 200, height: 200 }, x: 0, y: 0, height: 100, width: 100 }],
    columnHeights: [100, 20],
    height: 100,
  });
});

test('considers the gap', () => {
  expect(
    getMasonry({
      columnHeights: [0, 20],
      xGap: 40,
      yGap: 20,
      containerWidth: 240,
      images: [
        { width: 200, height: 200 },
        { width: 200, height: 300 },
      ],
    }),
  ).toEqual({
    grid: [
      { image: { width: 200, height: 200 }, x: 0, y: 20, height: 100, width: 100 },
      { image: { width: 200, height: 300 }, x: 140, y: 40, height: 150, width: 100 },
    ],
    columnHeights: [120, 190],
    height: 190,
  });
});

test('works with multiple columns and gaps', () => {
  expect(
    getMasonry({
      columnHeights: [0, 0, 0, 20],
      xGap: 10,
      yGap: 10,
      containerWidth: 430,
      images: [
        { width: 200, height: 200 },
        { width: 200, height: 300 },
        { width: 200, height: 200 },
      ],
    }),
  ).toEqual({
    grid: [
      { image: { width: 200, height: 200 }, x: 0, y: 10, height: 100, width: 100 },
      { image: { width: 200, height: 300 }, x: 110, y: 10, height: 150, width: 100 },
      { image: { width: 200, height: 200 }, x: 220, y: 10, height: 100, width: 100 },
    ],
    columnHeights: [110, 160, 110, 20],
    height: 160,
  });
});

test('handles no images', () => {
  expect(
    getMasonry({
      columnHeights: [0, 0, 0],
      xGap: 10,
      yGap: 10,
      containerWidth: 300,
      images: [],
    }),
  ).toEqual({
    grid: [],
    columnHeights: [0, 0, 0],
    height: 0,
  });
});

test('handles single image', () => {
  expect(
    getMasonry({
      columnHeights: [0, 0, 0],
      xGap: 10,
      yGap: 10,
      containerWidth: 320,
      images: [{ width: 200, height: 200 }],
    }),
  ).toEqual({
    grid: [{ image: { width: 200, height: 200 }, x: 0, y: 10, height: 100, width: 100 }],
    columnHeights: [110, 0, 0],
    height: 110,
  });
});
