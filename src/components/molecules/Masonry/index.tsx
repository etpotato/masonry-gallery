import { FCWithChildren } from '../../../types/react';
import { StyledColumn, StyledGrid, StyledItem } from './styles';
import { getMasonry } from '../../../utils/get-masonry';
import { Image } from '../../atoms/Image';
import useMatchMedia, { MediaSize } from '../../../hooks/useMatchMedia';
import { useRef, useState } from 'react';
import { ImageData } from '../../../types/image';

type ResponsiveSize = {
  sm: number;
  md: number;
  lg: number;
};

export type MasonryProps = {
  photos: ImageData[];
  gap: ResponsiveSize;
  columns: ResponsiveSize;
};

export const Masonry: FCWithChildren<MasonryProps> = ({ photos, gap, columns }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [curColumns, setCurColumns] = useState(columns.sm);
  const [curGap, setCurGap] = useState<number>(gap.sm);
  const [columnWidth, setColumnWidth] = useState<number>(300);

  useMatchMedia((size: MediaSize) => {
    const containerWidth = containerRef.current?.getBoundingClientRect().width || 1200;
    const newColumns = columns[size];
    const newGap = gap[size];
    const newColumnWidth = containerWidth - newGap * (newColumns - 1);

    setColumnWidth(newColumnWidth);
    setCurColumns(newColumns);
    setCurGap(newGap);
  });

  const photosWithColumns = getMasonry({
    images: photos,
    columnHeights: new Array(curColumns).fill(0),
    columnWidth,
    gap: curGap,
  });

  return (
    <StyledGrid columns={curColumns} gap={curGap}>
      {photosWithColumns.map((column, index) => (
        <StyledItem key={index}>
          <StyledColumn gap={curGap}>
            {column.map((photo) => (
              <StyledItem key={photo.id}>
                <Image image={photo} />
              </StyledItem>
            ))}
          </StyledColumn>
        </StyledItem>
      ))}
    </StyledGrid>
  );
};
