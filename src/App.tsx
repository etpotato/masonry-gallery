import { ThemeProvider } from 'styled-components';
import { Button } from './components/atoms/Button';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      Hello world
      <Button>First btn</Button>
    </ThemeProvider>
  );
}

export default App;
