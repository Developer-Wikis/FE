import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import React from 'react';
import { ReactNode, useCallback } from 'react';
import { ErrorBoundary, ErrorBoundaryPropsWithComponent } from 'react-error-boundary';
import { useRouter } from 'next/router';

interface ApiErrorBoundaryProps extends ErrorBoundaryPropsWithComponent {
  children: ReactNode;
}

const ApiErrorBoundary = ({
  FallbackComponent,
  children,
  onReset,
  resetKeys = [],
  ...props
}: ApiErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();
  const { pathname } = useRouter();

  const handleReset = useCallback(() => {
    reset();
    onReset && onReset();
  }, [onReset]);

  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={handleReset}
      resetKeys={[pathname, ...resetKeys]}
      {...props}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ApiErrorBoundary;
