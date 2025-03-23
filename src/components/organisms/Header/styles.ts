import styled from 'styled-components';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: ${({ theme }) => theme.padding.sm}px 0;
  background-color: ${({ theme }) => theme.colors.background};
  box-shadow: 0 0 8px 0 ${({ theme }) => theme.colors.shadow};
  opacity: ${({ theme }) => theme.opacity};
  z-index: 1;
`;
