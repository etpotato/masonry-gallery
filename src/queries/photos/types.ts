import { ImageData } from '../../types/image';

export type Pagination = {
  page: number;
  per_page: number;
};

export type FetchPhotosInput = { query?: string } & Partial<Pagination>;

export type Photos = {
  photos: ImageData[];
} & Pagination;

export type QueryPhotos = (input: FetchPhotosInput) => Promise<Photos>;
