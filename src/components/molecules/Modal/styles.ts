import styled from 'styled-components';
import { Button } from '../../atoms/Button';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

export const ModalScroll = styled.div`
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => theme.padding.xl}px;
  overflow-y: scroll;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.shadow};
`;

export const ModalContent = styled.div`
  position: relative;
  min-width: 80vw;
  min-height: 80vh;
  max-width: ${({ theme }) => theme.contanierWidth + theme.padding.xl * 2}px;
  margin: 0 auto;
  display: grid;
  align-items: center;
  padding: ${({ theme }) => theme.padding.xl}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.padding.sm}px;
  right: ${({ theme }) => theme.padding.sm}px;
`;
