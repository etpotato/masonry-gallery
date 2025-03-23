import { FC, useState } from 'react';
import { StyledImage, StyledSkeleton, StyledWrapper } from './styles';
import type { ImageData } from '../../../types/image';

export type ImageProps = {
  image: ImageData;
  size?: keyof ImageData['src'];
  className?: string;
};

export const Image: FC<ImageProps> = ({ image, className, size = 'lg' }) => {
  const [loading, setLoading] = useState(true);

  return (
    <StyledWrapper className={className}>
      <StyledImage
        src={image.src[size]}
        alt={image.title}
        width={image.width}
        height={image.height}
        onLoad={() => setLoading(false)}
      />
      {loading ? <StyledSkeleton $bgColor={image.background} /> : null}
    </StyledWrapper>
  );
};
