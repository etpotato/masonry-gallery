import type { Photos } from 'pexels';
import { withCachesSafe } from '../../utils/cachesSafe';
import { getUrl } from './getUrl';
import { FetchPhotosInput } from './types';

const API_KEY = import.meta.env.VITE_PHOTOS_API_KEY as string;

export async function fetchPhotos(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }

  return response;
}

const withCaches = await withCachesSafe<Photos>('photos', fetchPhotos);
export const queryPhotos = (input: FetchPhotosInput) => withCaches(getUrl(input));
