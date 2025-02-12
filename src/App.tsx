import { BrowserRouter, Route, Routes } from 'react-router';
import { ThemeProvider } from 'styled-components';

import { Button } from './components/atoms/Button';
import { theme } from './theme/theme';
import GlobalStyle from './theme/global-style';
import { Layout } from './components/templates/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Gallery } from './components/organisms/Gallery';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Gallery width={1200} columns={5} />} />
                <Route
                  path="/test"
                  element={
                    <>
                      Hello world test
                      <Button>First btn</Button>
                    </>
                  }
                />
              </Route>
            </Routes>
          </ThemeProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
