import styled from 'styled-components';

export type StyledGridProps = {
  columns: number;
  gap: number;
};

export const StyledGrid = styled.ul<StyledGridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: ${(props) => props.gap}px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledColumn = styled.ul<Pick<StyledGridProps, 'gap'>>`
  display: grid;
  gap: ${(props) => props.gap}px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const StyledItem = styled.li`
  display: block;
`;
