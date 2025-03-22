import { styled } from 'styled-components';

export const Button = styled.button`
  margin: 0;
  padding: 10px 20px;
  border: ${(props) => props.theme.borderWidth.sm}px solid currentColor;
  background-color: ${(props) => props.theme.colors.background};
  cursor: pointer;
`;
