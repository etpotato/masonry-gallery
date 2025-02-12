import styled from 'styled-components';
import { Link as RouterLink } from 'react-router';

export const Scrollable = styled.ul`
  position: relative;
  margin: 0 auto;
  padding: 0;
  list-style: none;
`;

export const Item = styled.li`
  position: absolute;
  top: 0;
  left: 0;
`;

export const StyledLink = styled(RouterLink)`
  display: contents;
`;
