import styled from 'styled-components';

export const StyledLink = styled.a`
  position: fixed;
  left: 0;
  bottom: 0;
  padding: ${({ theme }) => theme.padding.xs}px ${({ theme }) => theme.padding.md}px;
  /* border: ${({ theme }) => theme.borderWidth.sm}px solid currentColor; */
  font-size: 0.5em;
  color: currentColor;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 0 4px 0 ${({ theme }) => theme.colors.shadow};
  text-decoration: none;
  z-index: 1;
`;
