import { Outlet } from 'react-router';

import { Container } from '../../atoms/Container';
import { Header } from '../../organisms/Header';
import { StyledLayout, StyledMain } from './styles';

export const Layout = () => {
  return (
    <StyledLayout>
      <Header>Header</Header>
      <StyledMain>
        <Container>
          <Outlet />
        </Container>
      </StyledMain>
    </StyledLayout>
  );
};
