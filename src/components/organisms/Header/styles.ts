import { styled } from 'styled-components';

export const StyledHeader = styled.header`
  padding: ${(props) => props.theme.padding.md}px;
  border-bottom: ${(props) => props.theme.borderWidth.md}px solid currentColor;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: ${(props) => props.theme.padding.lg}px;
  }
`;
