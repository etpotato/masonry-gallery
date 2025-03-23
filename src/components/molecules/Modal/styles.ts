import styled from 'styled-components';
import { Button } from '../../atoms/Button';

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  z-index: 1;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

export const ModalContent = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.padding.lg}px;
  right: ${({ theme }) => theme.padding.lg}px;
  bottom: ${({ theme }) => theme.padding.lg}px;
  left: ${({ theme }) => theme.padding.lg}px;
  background-color: ${({ theme }) => theme.colors.background};
  overflow-y: scroll;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: ${({ theme }) => theme.padding.md}px;
  right: ${({ theme }) => theme.padding.md}px;
`;
