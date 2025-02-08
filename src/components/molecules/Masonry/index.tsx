import { FCWithChildren } from '../../../types/react';
import { StyledColumn, StyledGrid, StyledItem } from './styles';
import { getMasonry } from '../../../utils/get-masonry';
import { Image } from '../../atoms/Image';
import useMatchMedia, { MediaSize } from '../../../hooks/useMatchMedia';
import { useEffect, useRef, useState } from 'react';
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
  style: Record<string, string>;
};

const numberOfItems = 20;

export const Masonry: FCWithChildren<MasonryProps> = ({ photos, gap, columns, style }) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const columnsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const [curColumns, setCurColumns] = useState(columns.sm);
  const [curGap, setCurGap] = useState<number>(gap.sm);
  const [columnWidth, setColumnWidth] = useState<number>(300);

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(numberOfItems);

  useEffect(() => {
    console.log('start', start);
    console.log('end', end);
  }, [start, end]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('observer');
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setEnd((prev) => prev + 1);
          } else {
            setStart((prev) => Math.max(prev + 1, 0));
          }
        }
      },
      {
        rootMargin: '10%',
      },
    );
    console.log('effect');

    const images = containerRef.current?.querySelectorAll('img') || [];

    for (const item of images) {
      console.log('item', item);
      if (item) {
        observer.observe(item);
      }
    }

    return () => {
      observer.disconnect();
      columnsRef.current = [];
    };
  }, [photos]);

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
    images: photos.slice(start, end),
    columnHeights: new Array(curColumns).fill(0),
    columnWidth,
    gap: curGap,
  });

  return (
    <StyledGrid $columns={curColumns} $gap={curGap} style={style} ref={containerRef}>
      {photosWithColumns.map((column, colIndex) => (
        <StyledItem key={colIndex}>
          <StyledColumn $gap={curGap}>
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
