import styled from 'styled-components';

export const StyledList = styled.ul`
  margin: 0;
  margin-bottom: ${({ theme }) => theme.padding.lg}px;
  padding: 0;
  list-style: none;
`;

export const StyledItem = styled.li`
  margin-bottom: ${({ theme }) => theme.padding.md}px;
  font-size: 1.2em;

  &:last-child {
    margin-bottom: 0;
  }
`;
