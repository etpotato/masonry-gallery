import styled from 'styled-components';

export const TextInput = styled.input`
  margin: 0;
  padding: 10px;
  border: ${(props) => props.theme.borderWidth.sm}px solid currentColor;
  border-radius: 0;
  font-size: ${(props) => props.theme.fontSize.md}px;
  background-color: ${(props) => props.theme.colors.background};

  &:not(:focus-visible) {
    outline: none;
  }
`;
