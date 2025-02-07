import { FCWithChildren } from '../../../types/react';
import { Container } from '../../atoms/Container';
import { StyledHeader } from './styles';

export const Header: FCWithChildren = ({ children }) => {
  return (
    <StyledHeader>
      <Container>{children}</Container>
    </StyledHeader>
  );
};
