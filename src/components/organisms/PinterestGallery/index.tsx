import { useTheme } from 'styled-components';
// import data from '../../../../data.json';
import { fetchPhotos } from '../../../queries/photos/pexels';
import { Pinterest } from '../../molecules/Pinterest';
// import { Photos as PexelsPhotos } from 'pexels';
import { useInfiniteQuery } from '@tanstack/react-query';
import { removeImageDuplicates } from '../../../utils/remove-image-duplicates';
import { masonry } from '../../../utils/masonry';
import { useMemo, useRef } from 'react';

// const allPhotos = pexelsAdapdater(data as unknown as PexelsPhotos).photos;

export const PinterestGallery = () => {
  const theme = useTheme();
  const columnHeights = useRef([0, 0, 0, 0]);
  const height = useRef(0);

  const photosQuery = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: async ({ pageParam }) => {
      const data = await fetchPhotos({ page: pageParam, per_page: 20 });

      const result = masonry({
        xGap: theme.padding.md,
        yGap: theme.padding.md,
        columnHeights: columnHeights.current,
        containerWidth: 800,
        images: data.photos || [],
      });

      columnHeights.current = result.columnHeights;
      height.current += result.heightDelta;

      return { ...data, masonry: result };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.photos.length) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    select: (data) => {
      console.log('data', data);
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

  // const masonryResult = useMemo(() => {
  //   if (!photosQuery.data?.newPage.photos) {
  //     return;
  //   }

  //   const result = masonry({
  //     xGap: theme.padding.md,
  //     yGap: theme.padding.md,
  //     columnHeights: columnHeights.current,
  //     containerWidth: 800,
  //     images: photosQuery.data?.newPage.photos || [],
  //   });

  //   console.log('result', result);
  //   columnHeights.current = result.columnHeights;
  //   height.current += result.heightDelta;

  //   return result;
  // }, [photosQuery.data?.newPage.photos, theme.padding.md]);

  // console.log('photosQuery', photosQuery.data?.masonry);

  return (
    <>
      {photosQuery.data?.masonry ? (
        <Pinterest
          // images={photosQuery.data?.photos || []}
          containerWidth={800}
          // xGap={theme.padding.md}
          // yGap={theme.padding.md}
          margin={200}
          onBottom={photosQuery.fetchNextPage}
          masonry={photosQuery.data.masonry}
        />
      ) : null}
    </>
  );
};
