import { test, expect } from 'vitest';
import { getPexelsUrl } from './get-pexels-url';

test('exists', () => {
  expect(getPexelsUrl).toBeDefined();
});

test('return correct url for curated', () => {
  expect(getPexelsUrl({})).toBe('https://api.pexels.com/v1/curated?page=1&per_page=20');
  expect(getPexelsUrl({ page: 4 })).toBe('https://api.pexels.com/v1/curated?page=4&per_page=20');
  expect(getPexelsUrl({ per_page: 2, page: 6 })).toBe(
    'https://api.pexels.com/v1/curated?page=6&per_page=2',
  );
});

test('return correct url for search', () => {
  expect(getPexelsUrl({ query: 'dogs' })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=1&per_page=20',
  );

  expect(getPexelsUrl({ query: 'dogs', per_page: 30 })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=1&per_page=30',
  );

  expect(getPexelsUrl({ query: 'dogs', page: 2, per_page: 10 })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=2&per_page=10',
  );
});
