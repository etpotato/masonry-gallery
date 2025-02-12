import { FetchPhotoInput, FetchPhotosInput } from '../types';

const API_URL = 'https://api.pexels.com/v1';

export function getPexelsListingUrl({ query, page = 1, per_page = 20 }: FetchPhotosInput) {
  const searchParams = new URLSearchParams({
    ...(query ? { query } : null),
    page: String(page),
    per_page: String(per_page),
  });
  return `${API_URL}/${query ? 'search' : 'curated'}?${searchParams.toString()}`;
}

export function getPexelsDetailedUrl({ id }: FetchPhotoInput) {
  return `${API_URL}/photos/${id}`;
}
