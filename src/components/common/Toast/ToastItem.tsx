import styled from '@emotion/styled';
import { ReactNode, useState, useEffect } from 'react';
import useTimeoutFn from '~/hooks/useTimeoutFn';
import { theme } from '~/types/theme';
import useHover from '~/hooks/useHover';
import { isMobileWeb } from '~/utils/helper/device';
import { mediaQuery } from '~/utils/helper/mediaQuery';
import Link from '~/components/base/Link';
import { buttonSizes, buttonStyle } from '~/components/base/Button/types';

export interface ToastItemProps {
  /**
   * Toast의 내용이 들어갑니다.
   */
  message?: string;
  /**
   * Toast의 내용이 들어갑니다.
   */
  children?: ReactNode;
  /**
   * Link의 내용이 들어갑니다.
   */
  link?: {
    message: string;
    href: string;
    variant?: keyof typeof buttonStyle;
    size?: keyof typeof buttonSizes;
  };
  /**
   * Toast의 지속 시간을 설정합니다.
   */
  duration?: number;
  /**
   * true일 경우 Toast 호버 시 Toast가 사라지지 않습니다. (모바일 환경에서는 무시됩니다.)
   */
  keepAlive?: boolean;
  isRemoved?: boolean;
  onTimeout: () => void;
}

const ToastItem = ({
  message,
  children,
  link,
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
      isMessage={!!message && !link}
      ref={keepAlive && !isMobileWeb() ? ref : null}
      isRemoved={isRemoved}
      withLink={!!link}
    >
      {message && <span>{message}</span>}
      {link && (
        <Link href={link.href} variant={link.variant ?? 'borderGray'} size={link.size ?? 'sm'}>
          {link.message}
        </Link>
      )}
      {children}
    </Container>
  );
};

export default ToastItem;

const LinkStyle = `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.li<{
  show: boolean;
  isMessage: boolean;
  isRemoved: boolean;
  withLink: boolean;
}>`
  ${({ withLink }) => (withLink ? LinkStyle : undefined)}
  position: ${({ isRemoved }) => (isRemoved ? 'absolute' : 'relative')};
  width: 437px;
  height: 58px;
  border-radius: 4px;
  padding: ${({ isMessage }) => (isMessage ? '16px 0 15px' : '12px 12px 12px 22px')};
  text-align: ${({ isMessage }) => (isMessage ? 'center' : '')};
  ${theme.fontStyle.subtitle1}
  color: ${theme.colors.white};
  background-color: ${({ theme }) => theme.colors.gray700};
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

  ${mediaQuery('sm')} {
    width: 100%;
  }
`;

function getAnimationName(show: boolean, isRemoved: boolean) {
  if (show) {
    return 'create';
  }
  return isRemoved ? 'remove' : 'timeout';
}
