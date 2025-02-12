import { ImageIntrinsicSize } from '../types/image';
import { findIndexOfMin } from './find-index-of-min';

export type GetMasonryInput<T> = {
  columnHeights: number[];
  containerWidth: number;
  images: T[];
  xGap: number;
  yGap: number;
};

export type MasonryItem<T extends ImageIntrinsicSize> = {
  x: number;
  y: number;
  height: number;
  width: number;
  image: T;
};

export type MasonryData<T extends ImageIntrinsicSize> = {
  grid: MasonryItem<T>[];
  columnHeights: number[];
  height: number;
};

export function getMasonry<T extends ImageIntrinsicSize>({
  columnHeights,
  containerWidth,
  images,
  xGap,
  yGap,
}: GetMasonryInput<T>) {
  const columnWidth = (containerWidth - xGap * (columnHeights.length - 1)) / columnHeights.length;
  const heights = columnHeights.slice();

  const grid: MasonryItem<T>[] = images.map((image) => {
    const realImageHeight = (image.height / image.width) * columnWidth;
    const shortestColumnIndex = findIndexOfMin(heights);
    heights[shortestColumnIndex] += realImageHeight + yGap;

    return {
      image,
      x: shortestColumnIndex * columnWidth + shortestColumnIndex * xGap,
      y: heights[shortestColumnIndex] - realImageHeight,
      height: realImageHeight,
      width: columnWidth,
    };
  });

  return { grid, columnHeights: heights, height: Math.max(...heights) };
}
