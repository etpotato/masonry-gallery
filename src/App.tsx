import { BrowserRouter, Route, Routes, Link } from 'react-router';
import { ThemeProvider } from 'styled-components';
import { Button } from './components/atoms/Button';
import { theme } from './theme';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Link to="/test">First link</Link>
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
  );
}

export default App;
