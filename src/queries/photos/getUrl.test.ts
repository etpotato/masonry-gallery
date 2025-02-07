import { test, expect } from 'vitest';
import { getUrl } from './getUrl';

test('exists', () => {
  expect(getUrl).toBeDefined();
});

test('return correct url for curated', () => {
  expect(getUrl({})).toBe('https://api.pexels.com/v1/curated?page=1&per_page=20');
  expect(getUrl({ page: 4 })).toBe('https://api.pexels.com/v1/curated?page=4&per_page=20');
  expect(getUrl({ per_page: 2, page: 6 })).toBe(
    'https://api.pexels.com/v1/curated?page=6&per_page=2',
  );
});

test('return correct url for search', () => {
  expect(getUrl({ query: 'dogs' })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=1&per_page=20',
  );

  expect(getUrl({ query: 'dogs', per_page: 30 })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=1&per_page=30',
  );

  expect(getUrl({ query: 'dogs', page: 2, per_page: 10 })).toBe(
    'https://api.pexels.com/v1/search?query=dogs&page=2&per_page=10',
  );
});
