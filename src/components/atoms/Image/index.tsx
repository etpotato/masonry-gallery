import { FC, useState } from 'react';
import { StyledImage, StyledSkeleton, StyledWrapper } from './styles';
import type { ImageData } from '../../../types/image';

export type ImageProps = {
  image: ImageData;
};

export const Image: FC<ImageProps> = ({ image }) => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledWrapper>
      <StyledImage src={image.src.lg} alt={image.title} onLoad={() => setLoading(false)} />
      {loading ? <StyledSkeleton $bgColor={image.background} /> : null}
    </StyledWrapper>
  );
};
