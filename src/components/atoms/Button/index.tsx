import { styled } from 'styled-components';

export const Button = styled.button`
  margin: 0;
  padding: 10px 20px;
  border: ${(props) => props.theme.borderWidth.sm}px solid currentColor;
  border-radius: 0;
  font-size: ${(props) => props.theme.fontSize.md}px;
  font-weight: 400;
  color: inherit;
  background-color: ${(props) => props.theme.colors.background};
  cursor: pointer;
`;
