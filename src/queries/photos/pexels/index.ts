import type { Photos as PexelsPhotos } from 'pexels';
import { withCachesSafe } from '../../../utils/caches-safe';
import { getPexelsUrl } from './get-pexels-url';
import { Photos, QueryPhotos } from '../types';

const API_KEY = import.meta.env.VITE_PHOTOS_API_KEY as string;

async function fetchPexelsPhotos(url: string) {
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

export function pexelsAdapdater(data: PexelsPhotos): Photos {
  return {
    photos: data.photos.map((photo) => ({
      id: String(photo.id),
      src: {
        original: photo.src.original,
        md: photo.src.large,
        lg: photo.src.large2x,
      },
      title: photo.alt || '',
      width: photo.width,
      height: photo.height,
      author: photo.photographer,
      authorUrl: photo.photographer_url,
      background: photo.avg_color || undefined,
    })),
    page: data.page,
    per_page: data.per_page,
  };
}

const withCaches = await withCachesSafe<PexelsPhotos>('pexels-photos', fetchPexelsPhotos);
export const fetchPhotos: QueryPhotos = async (input) => {
  const result = await withCaches(getPexelsUrl(input));
  return pexelsAdapdater(result);
};
