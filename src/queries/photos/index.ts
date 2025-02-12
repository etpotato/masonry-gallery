import { QueryFunctionContext } from '@tanstack/react-query';
import { FetchPhotoInput, FetchPhotosInput } from './types';
import { fetchPhoto, fetchPhotos } from './pexels';

export const PhotoQueryKey = {
  all: ['photos'] as const,
  search(input: FetchPhotosInput) {
    return ['photos', input] as const;
  },
  detailed(input: FetchPhotoInput) {
    return ['photos', input] as const;
  },
};

export const PhotoQueryFn = {
  async search({ queryKey }: QueryFunctionContext<ReturnType<typeof PhotoQueryKey.search>>) {
    return fetchPhotos(queryKey[1]);
  },
  async detailed({ queryKey }: QueryFunctionContext<ReturnType<typeof PhotoQueryKey.detailed>>) {
    return fetchPhoto(queryKey[1]);
  },
};
