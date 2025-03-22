import { useTheme } from 'styled-components';
import { fetchPhotos } from '../../../queries/photos/pexels';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useMemo, useRef } from 'react';
import { PhotoQueryKey } from '../../../queries/photos';
import { getMasonry } from '../../../utils/get-masonry';
import { Loader } from '../../atoms/Loader';
import { Masonry } from '../../molecules/Masonry';
import { Outlet, useSearchParams } from 'react-router';
import useMatchMedia from '../../../hooks/use-match-media';
import { useResizeObserver } from '../../../hooks/use-resize-observer';

export type GalleryProps = {
  visibilityMargin: number;
};

export const Gallery: FC<GalleryProps> = ({ visibilityMargin }) => {
  const theme = useTheme();
  const mediaSize = useMatchMedia();
  const contaierRef = useRef<HTMLDivElement>(null);
  const width = useResizeObserver(contaierRef);
  const [searchParams] = useSearchParams();

  const photosQuery = useInfiniteQuery({
    queryKey: PhotoQueryKey.search({
      query: searchParams.get('query') || '',
    }),
    queryFn: async ({ pageParam, queryKey }) => {
      const data = await fetchPhotos({ page: pageParam, per_page: 20, query: queryKey[1].query });

      return { ...data };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.photos.length) {
        return undefined;
      }

      return lastPage.page + 1;
    },
    select: (data) => {
      return {
        ...data,
        photos: data.pages.flatMap((page) => page.photos),
      };
    },
  });

  const masonry = useMemo(() => {
    const result = getMasonry({
      xGap: theme.padding.md,
      yGap: theme.padding.md,
      columnHeights: new Array(theme.gridColumn[mediaSize]).fill(0),
      containerWidth: width,
      images: photosQuery.data?.photos || [],
    });

    return result;
  }, [theme.padding.md, theme.gridColumn, mediaSize, width, photosQuery.data?.photos]);

  return (
    <div ref={contaierRef}>
      {photosQuery.data?.photos ? (
        <Masonry
          margin={visibilityMargin}
          masonry={masonry}
          onBottomVisible={() => !photosQuery.isFetching && photosQuery.fetchNextPage()}
        />
      ) : null}
      {photosQuery.isFetching ? <Loader /> : null}
      <Outlet />
    </div>
  );
};
