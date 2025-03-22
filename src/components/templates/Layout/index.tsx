import { Outlet } from 'react-router';
import { PexelsCredit } from '../../atoms/PexelsCredit';
import { Container } from '../../atoms/Container';
import { Header } from '../../organisms/Header';
import { StyledMain } from './styles';

export const Layout = () => {
  return (
    <>
      <Header />
      <StyledMain>
        <Container>
          <Outlet />
        </Container>
        <PexelsCredit />
      </StyledMain>
    </>
  );
};
