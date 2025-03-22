import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme/theme';
import GlobalStyle from './theme/global-style';
import { Layout } from './components/templates/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Gallery } from './components/organisms/Gallery';
import { lazy } from 'react';

const queryClient = new QueryClient();

const DetailedViewLazy = lazy(() =>
  import('./components/organisms/DetailedView').then((module) => ({
    default: module.DetailedView,
  })),
);

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Gallery visibilityMargin={300} />}>
                  <Route path="/images/:id" element={<DetailedViewLazy />} />
                </Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
