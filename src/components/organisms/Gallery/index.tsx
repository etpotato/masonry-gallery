import { fetchPhotos } from '../../../queries/photos/pexels';
import { Masonry } from '../../molecules/Masonry';
import { useTheme } from 'styled-components';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader } from '../../atoms/Loader';
import { LoaderWrapper, ScrollContent, ScrollWrap } from './styles';
import { removeImageDuplicates } from '../../../utils/remove-image-duplicates';
import { useState } from 'react';

export const Gallery = () => {
  const theme = useTheme();
  const [translateY, setTranslateY] = useState(0);

  const photosQuery = useInfiniteQuery({
    queryKey: ['photos'],
    queryFn: ({ pageParam }) => fetchPhotos({ page: pageParam, per_page: 80 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.photos.length) {
        return undefined;
      }
      return lastPage.page + 1;
    },
    select: (data) => ({
      ...data,
      photos: removeImageDuplicates(data.pages.flatMap((page) => page.photos)),
    }),
  });

  const isLoading = photosQuery.isLoading || photosQuery.isFetchingNextPage;

  const handleScroll = (e: any) => {
    setTranslateY(-1 * e.target.scrollTop);
  };

  return (
    <ScrollWrap onScroll={handleScroll}>
      <ScrollContent>
        <Masonry
          style={{ transform: `translateY(${translateY}px)` }}
          photos={photosQuery.data?.photos || []}
          columns={theme.gridColumn}
          gap={{ sm: theme.padding.sm, md: theme.padding.md, lg: theme.padding.md }}
        />
        {isLoading ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        ) : null}
      </ScrollContent>
    </ScrollWrap>
  );
};
