import { Outlet } from 'react-router';
import { PexelsCredit } from '../../atoms/PexelsCredit';
import { Container } from '../../atoms/Container';

export const Layout = () => {
  return (
    <main>
      <Container>
        <Outlet />
      </Container>
      <PexelsCredit />
    </main>
  );
};
