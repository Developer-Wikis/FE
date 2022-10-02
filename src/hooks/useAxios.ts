import { AxiosError, AxiosResponse } from 'axios';
import { DependencyList, useCallback, useRef, useState } from 'react';

type AxiosFnVoid<T> = () => Promise<AxiosResponse<T>>;
type AxiosFnParams<T, R> = (...args: [T]) => Promise<AxiosResponse<R>>;

type CallbackVoid = () => Promise<void>;
type CallbackParams<T> = (args: T) => Promise<void>;

type UseAxiosReturn<T, R> = {
  isLoading: boolean;
  error: AxiosError | null;
  response: AxiosResponse<R> | null;
  callback: CallbackVoid & CallbackParams<T>;
};

const useAxios = <T, R>(
  axiosFn: AxiosFnVoid<R> & AxiosFnParams<T, R>,
  dependency: DependencyList,
  errorHandler?: (status: number, message: string) => void,
  refetch?: boolean,
): UseAxiosReturn<T, R> => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AxiosResponse<R> | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const lastCallId = useRef(0);

  const callback = useCallback((...args: any) => {
    const callId = ++lastCallId.current;

    if (!isLoading) {
      setIsLoading(true);
    }

    return axiosFn(args)
      .then((response) => {
        if (callId === lastCallId.current) {
          setResponse(response);
          setError(null);
        }
      })
      .catch((error) => {
        if (callId === lastCallId.current) {
          setError(error);
          setResponse(null);

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

  return { isLoading, response, error, callback };
};

export default useAxios;
