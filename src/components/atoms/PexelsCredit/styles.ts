import styled from 'styled-components';

export const StyledLink = styled.a`
  position: fixed;
  top: 0;
  left: 0;
  padding: ${({ theme }) => theme.padding.sm}px ${({ theme }) => theme.padding.md}px;
  border: ${({ theme }) => theme.borderWidth.sm}px solid currentColor;
  color: currentColor;
  background-color: ${({ theme }) => theme.colors.background};
  text-decoration: none;
  transform: translate(-98px, 92px) rotate(-90deg);
`;
