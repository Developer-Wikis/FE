import styled from '@emotion/styled';
import { ReactNode, useEffect, useMemo } from 'react';
import useClickAway from '~/hooks/useClickAway';
import Portal from './Portal';

export interface ModalProps {
  visible: boolean;
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, visible = false, onClose, ...props }: ModalProps) => {
  const ref = useClickAway<HTMLDivElement>(() => {
    onClose && onClose();
  });

  useEffect(() => {
    if (visible) {
      document.querySelector('body')?.classList.add('modal-open');
      ref.current?.focus();
    } else {
      document.querySelector('body')?.classList.remove('modal-open');
    }
  }, [visible]);

  return (
    <Portal>
      <BackgroundDim style={{ display: visible ? 'block' : 'none' }}>
        <ModalContainer ref={ref} role="dialog" tabIndex={0}>
          {children}
        </ModalContainer>
      </BackgroundDim>
    </Portal>
  );
};

export default Modal;

const BackgroundDim = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  margin: 0 auto;
  left: 0;
  right: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
