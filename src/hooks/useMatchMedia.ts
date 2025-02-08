import { useEffect } from 'react';
import { Theme } from '../theme/theme';
import { useTheme } from 'styled-components';

export type MediaSize = 'sm' | 'md' | 'lg';

function getQueries(breakpoints: Theme['breakpoints']) {
  const result: Record<MediaSize, string> = {
    sm: `(max-width: ${breakpoints.sm - 1}px)`,
    md: `(min-width: ${breakpoints.sm}px) and (max-width: ${breakpoints.md - 1}px)`,
    lg: `(min-width: ${breakpoints.md}px)`,
  };

  return result;
}

export default function useMatchMedia(callback: (size: MediaSize) => void) {
  const queries = getQueries(useTheme().breakpoints);

  useEffect(() => {
    const mediaList = Object.entries(queries).map(([size, query]) => {
      const mediaQuery = window.matchMedia(query);
      const listener = () => {
        if (mediaQuery.matches) {
          callback(size as MediaSize);
          // console.log('matches', size);
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
  }, [queries, callback]);
}
