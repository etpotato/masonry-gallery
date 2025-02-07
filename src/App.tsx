import { BrowserRouter, Route, Routes } from 'react-router';
import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import type { Photo } from 'pexels';

import { Button } from './components/atoms/Button';
import { Image } from './components/atoms/Image';
import { theme } from './theme/theme';
import GlobalStyle from './theme/globalStyle';
import { queryPhotos } from './queries/photos';
import { Layout } from './components/templates/Layout';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  async function getPhotos() {
    setPhotos([]);
    const data = await queryPhotos({ query: 'dog', per_page: 20 });
    console.log('data', data);
    setPhotos(data.photos);
  }

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <>
                    <Button onClick={getPhotos}>First link</Button>
                    {photos.map((photo) => (
                      <Image photo={photo} key={photo.id} />
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
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
