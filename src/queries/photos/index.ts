import { QueryFunctionContext } from '@tanstack/react-query';
import { FetchPhotosInput } from './types';
import { fetchPhotos } from './pexels';

export const PhotoQueryKey = {
  all: ['photos'] as const,
  search(input: FetchPhotosInput) {
    return ['photos', input] as const;
  },
};

export const PhotoQueryFn = {
  async search({ queryKey }: QueryFunctionContext<ReturnType<typeof PhotoQueryKey.search>>) {
    return fetchPhotos(queryKey[1]);
  },
};
