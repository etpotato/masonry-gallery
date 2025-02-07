import styled from 'styled-components';

export const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const StyledMain = styled.main`
  flex: 1;
  padding: ${(props) => props.theme.padding.md}px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: ${(props) => props.theme.padding.lg}px;
  }
`;
