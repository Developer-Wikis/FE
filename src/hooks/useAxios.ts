import { AxiosError, AxiosResponse } from 'axios';
import { DependencyList, useCallback, useRef, useState } from 'react';

type AxiosFnVoid<R> = () => Promise<AxiosResponse<R>>;
type AxiosFnParams<T, R> = (args: T) => Promise<AxiosResponse<R>>;

type CallbackVoid<R> = () => Promise<AxiosResponse<R> | void>;
type CallbackParams<T, R> = (args: T) => Promise<AxiosResponse<R> | void>;

type UseAxiosReturn<T, R> = {
  isLoading: boolean;
  error: AxiosError | null;
  request: CallbackVoid<R> | CallbackParams<T, R>;
};

const useAxios = <T, R>(
  axiosFn: AxiosFnVoid<R> | AxiosFnParams<T, R>,
  dependency: DependencyList,
  errorHandler?: (status: number, message: string) => void,
): UseAxiosReturn<T, R> => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const lastCallId = useRef(0);

  const request = useCallback((args: T) => {
    const callId = ++lastCallId.current;

    if (!isLoading) {
      setIsLoading(true);
    }

    return axiosFn(args)
      .then((response) => {
        if (callId === lastCallId.current) {
          setError(null);
          return response;
        }
      })
      .catch((error) => {
        if (callId === lastCallId.current) {
          setError(error);

          if (error.response) {
            errorHandler && errorHandler(error.response.status, error.message);
          }

          console.error(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, dependency);

  return { isLoading, error, request };
};

export default useAxios;
