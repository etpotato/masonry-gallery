import styled from 'styled-components';

export const ScrollContainer = styled.div`
  height: calc(100vh - 85px);
  overflow-y: auto;
`;

export const Scrollable = styled.div`
  position: relative;
  margin: 0 auto;
`;

export const Item = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
