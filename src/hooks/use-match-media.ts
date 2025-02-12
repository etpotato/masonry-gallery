import { useEffect, useState } from 'react';
import { Theme } from '../theme/theme';
import { useTheme } from 'styled-components';

export type MediaSize = 'sm' | 'md' | 'lg' | 'xl';

function getQueries(breakpoints: Theme['breakpoints']) {
  const result: Record<MediaSize, string> = {
    sm: `(max-width: ${breakpoints.sm - 1}px)`,
    md: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
    lg: `(min-width: ${breakpoints.md}px) and (max-width: ${breakpoints.lg - 1}px)`,
    xl: `(min-width: ${breakpoints.lg}px)`,
  };

  return result;
}

export default function useMatchMedia() {
  const [mediaSize, setMediaSize] = useState<MediaSize>('sm');
  const queries = getQueries(useTheme().breakpoints);

  useEffect(() => {
    const mediaList = Object.entries(queries).map(([size, query]) => {
      const mediaQuery = window.matchMedia(query);
      const listener = () => {
        if (mediaQuery.matches) {
          setMediaSize(size as MediaSize);
        }
      };

      return { query: mediaQuery, callback: listener };
    }, {});

    for (const { query, callback } of mediaList) {
      callback();
      query.addEventListener('change', callback);
    }

    return () => {
      for (const { query, callback } of mediaList) {
        query.removeEventListener('change', callback);
      }
    };
  }, [queries]);

  return mediaSize;
}
