import { test, expect } from 'vitest';
import { getMasonry } from './get-masonry';

const twoImages = [
  { width: 10, height: 10 },
  { width: 10, height: 20 },
];

const threeImages = [
  { width: 10, height: 10 },
  { width: 10, height: 20 },
  { width: 10, height: 100 },
];

const withVariableAspectRatio = [
  { width: 100, height: 100 },
  { width: 50, height: 100 },
  { width: 200, height: 50 },
  { width: 100, height: 100 },
];

const forGapTest = [
  { width: 10, height: 30 },
  { width: 10, height: 10 },
  { width: 10, height: 10 },
  { width: 10, height: 20 },
];

test('exists', () => {
  expect(getMasonry).toBeDefined();
});

test('returns empty array for empty input', () => {
  expect(getMasonry({ columnHeights: [], columnWidth: 10, images: [], gap: 0 })).toEqual([]);
});

test('returns array of images', () => {
  expect(getMasonry({ columnHeights: [0], columnWidth: 10, images: twoImages, gap: 0 })).toEqual([
    twoImages,
  ]);
});

test('returns correct number of columns', () => {
  expect(
    getMasonry({ columnHeights: [0, 0, 0, 0], columnWidth: 10, images: twoImages, gap: 0 }),
  ).toEqual([[twoImages[0]], [twoImages[1]], [], []]);
});

test('uses shortest columns to insert new image', () => {
  expect(
    getMasonry({ columnHeights: [-20, 0, 0], columnWidth: 10, images: threeImages, gap: 0 }),
  ).toEqual([threeImages.slice(0, 2), [threeImages[2]], []]);
});

test('shortest column is in the middle', () => {
  expect(
    getMasonry({ columnHeights: [0, -20, 0], columnWidth: 10, images: threeImages, gap: 0 }),
  ).toEqual([[threeImages[2]], threeImages.slice(0, 2), []]);
});

test('respects column width', () => {
  expect(
    getMasonry({
      columnHeights: [-20, 0],
      columnWidth: 10,
      images: withVariableAspectRatio,
      gap: 0,
    }),
  ).toEqual([withVariableAspectRatio.slice(0, 2), withVariableAspectRatio.slice(2)]);
});

test('counts gap height', () => {
  expect(
    getMasonry({
      columnHeights: [0, 0],
      columnWidth: 10,
      images: forGapTest,
      gap: 10,
    }),
  ).toEqual([
    [forGapTest[0], forGapTest[3]],
    [forGapTest[1], forGapTest[2]],
  ]);
});
