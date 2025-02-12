import throttle from 'lodash.throttle';
import { RefObject, useEffect, useState } from 'react';

export function useResizeObserver(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(ref.current?.clientWidth ?? 0);

  useEffect(() => {
    const resizeObserverCallback = throttle((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        setWidth(entry.target.clientWidth);
      }
    }, 500);
    const resizeObserver = new ResizeObserver(resizeObserverCallback);

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);

  return width;
}
