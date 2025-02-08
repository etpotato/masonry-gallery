import { useState, useRef, useEffect, useCallback } from 'react';
import { ImageData } from '../../../types/image';

const VirtualizedList = ({
  items,
  itemHeight,
  renderItem,
}: {
  items: ImageData[];
  itemHeight: number;
  renderItem: (item: ImageData) => React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [visibleItems, setVisibleItems] = useState<ImageData[]>([]);

  const getVisibleItems = useCallback(() => {
    if (!containerRef.current) return [];

    const containerHeight = containerRef.current.clientHeight;
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.ceil((scrollTop + containerHeight) / itemHeight);

    const visible = items.slice(startIndex, endIndex);
    return visible.map((item, index) => ({
      ...item,
      index: startIndex + index, // Actual index in the original array
    }));
  }, [items, itemHeight, scrollTop]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollTop(containerRef.current?.scrollTop || 0);
    };

    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => {
      container?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setVisibleItems(getVisibleItems());
  }, [getVisibleItems]);

  const getItemStyle = (index: number) => {
    return {
      position: 'absolute',
      top: index * itemHeight,
      left: 0,
      width: '100%',
      height: itemHeight,
    };
  };

  const placeholderHeight = items.length * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{
        height: '500px', // Or whatever your container height is
        overflowY: 'scroll',
        position: 'relative', // Important for absolute positioning of items
      }}
    >
      <div
        style={{ height: placeholderHeight, position: 'absolute', top: 0, left: 0, width: '100%' }}
      ></div>{' '}
      {/* Placeholder for the whole list */}
      {visibleItems.map((item, index) => (
        <div key={item.id} style={getItemStyle(index)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

// Example usage:
const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }));

const MyComponent = () => {
  const renderItem = (item) => <p>{item.text}</p>;

  return <VirtualizedList items={items} itemHeight={50} renderItem={renderItem} />;
};

export default MyComponent;
