import styled from '@emotion/styled';
import { ReactNode, useState, useEffect } from 'react';
import useTimeoutFn from '~/hooks/useTimeoutFn';
import { theme } from '~/types/theme';
import useHover from '~/hooks/useHover';
import { isMobileWeb } from '~/utils/helper/device';

export interface ToastItemProps {
  message?: string;
  children?: ReactNode;
  duration?: number;
  keepAlive?: boolean;
  isRemoved?: boolean;
  onTimeout: () => void;
}

const ToastItem = ({
  message,
  children,
  duration = 3000,
  keepAlive = false,
  isRemoved = false,
  onTimeout,
}: ToastItemProps) => {
  const [show, setShow] = useState(true);
  const [ref, isHover] = useHover<HTMLLIElement>();
  const [setTimer, clearTimer] = useTimeoutFn(() => {
    handleTimeout();
  }, duration);

  const handleTimeout = () => {
    setShow(false);
    setTimeout(() => onTimeout && onTimeout(), 400);
  };

  useEffect(() => {
    if (isHover) {
      clearTimer();
    } else {
      setTimer();
    }
  }, [isHover]);

  useEffect(() => {
    if (!isRemoved) return;

    clearTimer();
    handleTimeout();
  }, [isRemoved]);

  return (
    <Container
      show={show}
      isMessage={!!message}
      ref={keepAlive && !isMobileWeb() ? ref : null}
      isRemoved={isRemoved}
    >
      {message && <span>{message}</span>}
      {children}
    </Container>
  );
};

export default ToastItem;

const Container = styled.li<{ show: boolean; isMessage: boolean; isRemoved: boolean }>`
  position: ${({ isRemoved }) => (isRemoved ? 'absolute' : 'relative')};
  width: 437px;
  height: 58px;
  border-radius: 4px;
  padding: ${({ isMessage }) => (isMessage ? '16px 0 15px' : '12px 12px 12px 22px')};
  text-align: ${({ isMessage }) => (isMessage ? 'center' : '')};
  ${theme.fontStyle.subtitle1}
  color: ${theme.colors.white};
  background-color: rgba(16, 16, 16, 0.78);
  animation: ${({ show, isRemoved }) => getAnimationName(show, isRemoved)} 0.4s ease-out forwards;

  &:not(:first-of-type) {
    margin-top: 8px;
  }

  @keyframes create {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes timeout {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-100%);
    }
  }

  @keyframes remove {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-200%);
    }
  }
`;

function getAnimationName(show: boolean, isRemoved: boolean) {
  if (show) {
    return 'create';
  }
  return isRemoved ? 'remove' : 'timeout';
}
