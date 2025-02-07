import { ImageIntrinsicSize } from '../types/image';
import { findIndexOfMin } from './find-index-of-min';

export type GetMasonryInput<T> = {
  columnHeights: number[];
  columnWidth: number;
  images: T[];
  gap: number;
};

export function getMasonry<T extends ImageIntrinsicSize>({
  columnHeights,
  columnWidth,
  images,
  gap,
}: GetMasonryInput<T>) {
  if (!columnHeights.length) {
    return [];
  }

  const heights = columnHeights.slice();
  const columns: T[][] = columnHeights.map(() => []);

  for (const image of images) {
    const realHeight = (image.height / image.width) * columnWidth + gap;
    const shortestColumnIndex = findIndexOfMin(heights);
    columns[shortestColumnIndex].push(image);
    heights[shortestColumnIndex] += realHeight;
  }

  return columns;
}
