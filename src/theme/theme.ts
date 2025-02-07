export const theme = {
  colors: {
    background: '#fff',
    neutral: '#f0f0f0',
  },
  padding: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 32,
    xl: 64,
  },
  borderWidth: {
    sm: 1,
    md: 2,
  },
  breakpoints: {
    sm: 600,
    md: 900,
  },
  contanierWidth: 1200,
  gridColumn: {
    sm: 2,
    md: 3,
    lg: 4,
  },
} as const;

export type Theme = typeof theme;
