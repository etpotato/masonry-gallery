import styled from 'styled-components';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 ${(props) => props.theme.padding.md}px;
  max-width: ${(props) => props.theme.contanierWidth}px;

  @media (min-width: ${(props) => props.theme.breakpoints.sm}px) {
    padding: 0 ${(props) => props.theme.padding.lg}px;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.md}px) {
    padding: 0 ${(props) => props.theme.padding.xl}px;
  }
`;
