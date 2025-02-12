import { test, expect } from 'vitest';
import { getPexelsListingUrl } from './get-pexels-url';

test('exists', () => {
  expect(getPexelsListingUrl).toBeDefined();
});

test('return correct url for curated', () => {
  expect(getPexelsListingUrl({})).toBe('https://api.pexels.com/v1/curated?page=1&per_page=20');
  expect(getPexelsListingUrl({ page: 4 })).toBe(
    'https://api.pexels.com/v1/curated?page=4&per_page=20',
  );
  expect(getPexelsListingUrl({ per_page: 2, page: 6 })).toBe(
    'https://api.pexels.com/v1/curated?page=6&per_page=2',
  );
});

test('return correct url for search', () => {
  expect(getPexelsListingUrl({ query: 'dogs' })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=1&per_page=20',
  );

  expect(getPexelsListingUrl({ query: 'dogs', per_page: 30 })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=1&per_page=30',
  );

  expect(getPexelsListingUrl({ query: 'dogs', page: 2, per_page: 10 })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=2&per_page=10',
  );
});
