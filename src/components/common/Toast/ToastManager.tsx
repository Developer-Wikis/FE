import styled from '@emotion/styled';
import { useRef, useState, useEffect, useCallback } from 'react';
import ToastItem, { ToastItemProps } from './ToastItem';

export type TCreateToast = (props: Omit<ToastItemProps, 'onTimeout'>) => void;
type WithId<T> = T & { id: number };

interface ToastManagerProps {
  bind: (createToastFn: TCreateToast) => void;
  limit: number;
}

const ToastManager = ({ bind, limit }: ToastManagerProps) => {
  const lastId = useRef(0);
  const [toasts, setToasts] = useState<WithId<Omit<ToastItemProps, 'onTimeout'>>[]>([]);

  const createToast: TCreateToast = useCallback((params) => {
    const newToast = { id: lastId.current++, ...params };

    setToasts((prevToasts) => {
      const newToasts = [...prevToasts, newToast].map((toast, idx, newToasts) => {
        const isOverLimit = newToasts.length > limit && idx < newToasts.length - limit;
        return isOverLimit ? { ...toast, isRemoved: true } : toast;
      });

      return newToasts;
    });
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  useEffect(() => {
    bind(createToast);
  }, [bind, createToast]);

  return (
    <StyledUl>
      {toasts.map(({ id, ...props }) => (
        <ToastItem key={id} onTimeout={() => removeToast(id)} {...props} />
      ))}
    </StyledUl>
  );
};

export default ToastManager;

const StyledUl = styled.ul`
  position: fixed;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  z-index: 2000;
`;
