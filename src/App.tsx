import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme/theme';
import GlobalStyle from './theme/global-style';
import { Layout } from './components/templates/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Gallery } from './components/organisms/Gallery';
import { DetailedView } from './components/organisms/DetailedView';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route element={<Layout />}>
                <Route
                  path="/"
                  element={<Gallery width={1200} columns={5} visibilityMargin={200} />}
                >
                  <Route path="/image/:id" element={<DetailedView />} />
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
