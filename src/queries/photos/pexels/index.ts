import type { Photos as PexelsPhotos, Photo as PexelsPhoto } from 'pexels';
import { withCachesSafe } from '../../../utils/caches-safe';
import { getPexelsDetailedUrl, getPexelsListingUrl } from './get-pexels-url';
import { Photos, QueryPhoto, QueryPhotos } from '../types';
import { ImageData } from '../../../types/image';

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

function mapPexelsPhoto(photo: PexelsPhoto): ImageData {
  return {
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
    url: photo.url,
    background: photo.avg_color || undefined,
  };
}

export function pexelsAdapdater(data: PexelsPhotos): Photos {
  return {
    photos: data.photos.map((photo) => mapPexelsPhoto(photo)),
    page: data.page,
    per_page: data.per_page,
  };
}

const listingWithCaches = withCachesSafe<PexelsPhotos>('pexels-photos', fetchPexelsPhotos);
export const fetchPhotos: QueryPhotos = async (input) => {
  const result = await listingWithCaches(getPexelsListingUrl(input));
  return pexelsAdapdater(result);
};

const detailedWithCaches = withCachesSafe<PexelsPhoto>('pexels-photo', fetchPexelsPhotos);
export const fetchPhoto: QueryPhoto = async (input) => {
  const result = await detailedWithCaches(getPexelsDetailedUrl(input));
  return mapPexelsPhoto(result);
};
