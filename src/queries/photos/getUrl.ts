import { FetchPhotosInput } from './types';

export function getUrl({ query, page = 1, per_page = 20 }: FetchPhotosInput) {
  const searchParams = new URLSearchParams({
    ...(query ? { query } : null),
    page: String(page),
    per_page: String(per_page),
  });
  return `https://api.pexels.com/v1/${query ? 'search' : 'curated'}?${searchParams.toString()}`;
}
