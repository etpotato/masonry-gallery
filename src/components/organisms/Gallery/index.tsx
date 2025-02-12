import { useTheme } from 'styled-components';
import { fetchPhotos } from '../../../queries/photos/pexels';
import { useInfiniteQuery } from '@tanstack/react-query';
import { FC, useRef } from 'react';
import { PhotoQueryKey } from '../../../queries/photos';
import { getMasonry } from '../../../utils/get-masonry';
import { Loader } from '../../atoms/Loader';
import { Masonry } from '../../molecules/Masonry';
import { LoaderWrapper } from './styles';

export type GalleryProps = {
  width: number;
  columns: number;
};

export const Gallery: FC<GalleryProps> = ({ width, columns }) => {
  const theme = useTheme();
  const columnHeights = useRef(new Array(columns).fill(0));

  const photosQuery = useInfiniteQuery({
    queryKey: PhotoQueryKey.all,
    queryFn: async ({ pageParam }) => {
      const data = await fetchPhotos({ page: pageParam, per_page: 25 });

      const masonry = getMasonry({
        xGap: theme.padding.md,
        yGap: theme.padding.md,
        columnHeights: columnHeights.current,
        containerWidth: width,
        images: data.photos || [],
      });

      columnHeights.current = masonry.columnHeights;

      return { ...data, masonry };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.photos.length) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    select: (data) => {
      const masonry = {
        ...data.pages[data.pages.length - 1].masonry,
        grid: data.pages.flatMap((page) => page.masonry.grid),
      };
      return {
        ...data,
        masonry,
      };
    },
  });

  return (
    <>
      {photosQuery.data?.masonry ? (
        <Masonry
          containerWidth={width}
          margin={300}
          masonry={photosQuery.data.masonry}
          onBottomVisible={() => !photosQuery.isFetching && photosQuery.fetchNextPage()}
        />
      ) : null}
      {photosQuery.isFetching ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : null}
    </>
  );
};
