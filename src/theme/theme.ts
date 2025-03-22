export const theme = {
  colors: {
    background: '#fff',
    neutral: '#f0f0f0',
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.2)',
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
    lg: 1200,
  },
  contanierWidth: 1400,
  gridColumn: {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  },
} as const;

export type Theme = typeof theme;
