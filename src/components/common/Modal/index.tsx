import styled from '@emotion/styled';
import { ReactNode, useEffect } from 'react';
import BackgroundDim from '~/components/base/BackgroundDim';
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
      <BackgroundDim style={{ display: visible ? 'block' : 'none' }} {...props}>
        <ModalContainer ref={ref} role="dialog" tabIndex={0}>
          {children}
        </ModalContainer>
      </BackgroundDim>
    </Portal>
  );
};

export default Modal;

const ModalContainer = styled.div`
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0 16px;
`;
