import styled from 'styled-components';

export const StyledForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.padding.md}px;
`;
