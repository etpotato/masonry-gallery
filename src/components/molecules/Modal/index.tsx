import { createPortal } from 'react-dom';
import { CloseButton, ModalContent, ModalOverlay, ModalScroll, ModalWrapper } from './styles';
import { useEffect } from 'react';
import { FCWithChildren } from '../../../types/react';

export type ModalProps = {
  onClose: () => void;
};

export const Modal: FCWithChildren<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEsc = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return createPortal(
    <ModalWrapper>
      <ModalOverlay onClick={() => onClose()} />
      <ModalScroll>
        <ModalContent>
          <CloseButton onClick={() => onClose()}>X</CloseButton>
          {children}
        </ModalContent>
      </ModalScroll>
    </ModalWrapper>,
    document.body,
  );
};
