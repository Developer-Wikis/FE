import axios from 'axios';
import { useEffect } from 'react';
import { FallbackProps } from 'react-error-boundary';
import { useUser } from '~/react-query/hooks/useUser';

const ErrorComponent = ({ error, resetErrorBoundary }: FallbackProps) => {
  useEffect(() => {
    if (!axios.isAxiosError(error)) {
      throw error;
    }

    window.location.href = '/login';
    alert('로그인이 필요한 서비스입니다.');
  }, []);

  return <></>;
};

export default ErrorComponent;
