import styled from 'styled-components';

export const LoaderWrap = styled.div`
  height: 100%;
  display: grid;
  place-content: center;
`;

export const TextWrap = styled.div`
  padding: ${({ theme }) => theme.padding.lg}px;
`;

export const StyledParagraph = styled.p`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.padding.md}px;
  list-style: none;
  font-size: 0.8em;

  &:last-child {
    margin-bottom: 0;
  }
`;
