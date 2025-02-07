import { BrowserRouter, Route, Routes, Link } from 'react-router';
import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import type { Photo } from 'pexels';

import { Button } from './components/atoms/Button';
import { theme } from './theme/theme';
import GlobalStyle from './theme/globalStyle';
import { queryPhotos } from './queries/photos';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    (async function () {
      const data = await queryPhotos({ query: 'dog' });
      console.log('data', data);
      setPhotos(data.photos);
    })();
  }, []);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Link to="/test">First link</Link>
                  {photos.map((photo) => (
                    <img src={photo.src.large} />
                  ))}
                </>
              }
            />
            <Route
              path="/test"
              element={
                <>
                  Hello world test
                  <Button>First btn</Button>
                </>
              }
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
