import type { Photo } from 'pexels';
import { FC, useState } from 'react';
import { StyledImage, StyledSkeleton, StyledWrapper } from './styles';

export type ImageProps = {
  photo: Photo;
};

export const Image: FC<ImageProps> = ({ photo }) => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledWrapper>
      <StyledImage src={photo.src.large} onLoad={() => setLoading(false)} />
      {loading ? <StyledSkeleton bgColor={photo.avg_color} /> : null}
    </StyledWrapper>
  );
};
