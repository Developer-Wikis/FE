import axios from 'axios';
import { FallbackProps } from 'react-error-boundary';
import { useUser } from '~/react-query/hooks/useUser';
import ErrorComponent from '../FallbackComponent/ErrorComponent';

const AuthFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  if (!axios.isAxiosError(error)) {
    throw error;
  }

  switch (error.response?.status) {
    case 401:
      return <ErrorComponent error={error} resetErrorBoundary={resetErrorBoundary} />;
  }

  return <></>;
};

export default AuthFallback;
