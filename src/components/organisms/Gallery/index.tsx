import { useEffect, useState } from 'react';
import { queryPhotos } from '../../../queries/photos/pexels';
import { Masonry } from '../../molecules/Masonry';
import { useTheme } from 'styled-components';
import { ImageData } from '../../../types/image';

export const Gallery = () => {
  const [photos, setPhotos] = useState<ImageData[]>([]);
  const theme = useTheme();

  useEffect(() => {
    (async function getPhotos() {
      setPhotos([]);
      const data = await queryPhotos({ query: 'dog', per_page: 20 });
      console.log('data', data);
      setPhotos(data.photos);
    })();
  }, []);

  return (
    <Masonry
      photos={photos}
      columns={theme.gridColumn}
      gap={{ sm: theme.padding.sm, md: theme.padding.md, lg: theme.padding.md }}
    />
  );
};
