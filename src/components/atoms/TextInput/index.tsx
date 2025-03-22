import styled from 'styled-components';

export const TextInput = styled.input`
  margin: 0;
  padding: 10px;
  border: ${(props) => props.theme.borderWidth.sm}px solid currentColor;
  background-color: ${(props) => props.theme.colors.background};

  &:focus {
    outline: none;
  }
`;
