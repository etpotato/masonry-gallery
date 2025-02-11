import { FC, useEffect, useMemo, useState } from 'react';
import { Masonry, MasonryItem } from '../../../utils/masonry';
import { Item, Scrollable, ScrollContainer } from './styles';
import { ImageData } from '../../../types/image';
import { Image } from '../../atoms/Image';
import throttle from 'lodash.throttle';

export type PinterestProps = {
  // images: ImageData[];
  containerWidth: number;
  // xGap: number;
  // yGap: number;
  margin: number;
  onBottom: () => void;
  masonry: Masonry<ImageData>;
};

function getKey(item: Pick<MasonryItem<ImageData>, 'x' | 'y'>) {
  return `${item.x}-${item.y}`;
}

export const Pinterest: FC<PinterestProps> = ({
  // images,
  containerWidth,
  // xGap,
  // yGap,
  margin,
  masonry,
  onBottom,
}) => {
  console.log('render');
  const [visible, setVisible] = useState(new Set<string>());

  useEffect(() => {
    setVisible((state) =>
      state.size ? state : new Set<string>(masonry.grid.map((item) => getKey(item))),
    );
  }, [masonry.grid]);

  const handleScroll = useMemo(
    () =>
      throttle((event) => {
        const top = event.target.scrollTop - event.target.offsetTop;
        const bottom = top + window.innerHeight;

        const newVisible = new Set<string>(
          masonry.grid
            .filter((item) => {
              const show = item.y + item.height > top - margin && item.y < bottom + margin;
              return show;
            })
            .map((item) => getKey(item)),
        );
        setVisible(newVisible);

        if (newVisible.has(getKey(masonry.grid[masonry.grid.length - 1]))) {
          console.log('bottom');
          onBottom();
        }
      }, 500),
    [masonry.grid, margin, onBottom],
  );

  return (
    <ScrollContainer onScroll={handleScroll}>
      <Scrollable style={{ width: containerWidth, height: masonry.heightDelta }}>
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
              <Image image={image} />
            </Item>
          ) : null,
        )}
      </Scrollable>
    </ScrollContainer>
  );
};
