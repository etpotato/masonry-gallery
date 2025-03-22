import { FCWithChildren } from '../../../types/react';
import { Container } from '../../atoms/Container';
import { Search } from '../../molecules/Search';
import { StyledHeader } from './styles';

export const Header: FCWithChildren = () => {
  return (
    <StyledHeader>
      <Container>
        <Search />
      </Container>
    </StyledHeader>
  );
};
