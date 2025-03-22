import { FC, memo, useEffect, useMemo, useState } from 'react';
import { MasonryData, MasonryItem } from '../../../utils/get-masonry';
import { Item, Scrollable, StyledLink } from './styles';
import { ImageData } from '../../../types/image';
import { Image } from '../../atoms/Image';
import throttle from 'lodash.throttle';
import { useSearchParams } from 'react-router';

export type MasonryProps = {
  margin: number;
  masonry: MasonryData<ImageData>;
  onBottomVisible: () => void;
};

function getKey(item: Pick<MasonryItem<ImageData>, 'x' | 'y'>) {
  return `${item.x}-${item.y}`;
}

function getVisibleItems(grid: MasonryItem<ImageData>[], margin: number) {
  const top = window.scrollY;
  const bottom = top + window.innerHeight;

  return new Set<string>(
    grid
      .filter((item) => {
        const show = item.y + item.height > top - margin && item.y < bottom + margin;
        return show;
      })
      .map((item) => getKey(item)),
  );
}

const MemoImage = memo(Image);

export const Masonry: FC<MasonryProps> = ({ margin, masonry, onBottomVisible }) => {
  const [visible, setVisible] = useState(new Set<string>());
  const [searchParams] = useSearchParams();

  useEffect(() => {
    setVisible(getVisibleItems(masonry.grid, margin));
  }, [margin, masonry.grid]);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const newVisible = getVisibleItems(masonry.grid, margin);
        setVisible(newVisible);

        if (newVisible.has(getKey(masonry.grid[masonry.grid.length - 1]))) {
          onBottomVisible();
        }
      }, 50),
    [masonry.grid, margin, onBottomVisible],
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Scrollable style={{ height: masonry.height }}>
      {masonry.grid.map(({ image, x, y, width, height }) =>
        visible.has(getKey({ x, y })) ? (
          <Item
            key={getKey({ x, y })}
            style={{
              transform: `translate(${x}px, ${y}px)`,
              width: `${width}px`,
              height: `${height}px`,
            }}
          >
            <StyledLink to={{ pathname: `/images/${image.id}`, search: searchParams.toString() }}>
              <MemoImage image={image} />
            </StyledLink>
          </Item>
        ) : null,
      )}
    </Scrollable>
  );
};
