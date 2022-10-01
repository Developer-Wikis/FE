import { AxiosError, AxiosResponse } from 'axios';
import { DependencyList, useCallback, useRef, useState } from 'react';

type AxiosFn<Request, Response> = (args: Request) => Promise<AxiosResponse<Response>>;

type UseAxiosReturn<Request, Response> = {
  isLoading: boolean;
  error: AxiosError | null;
  response: AxiosResponse<Response> | null;
  callback: (args: Request) => Promise<void>;
};

const useAxios = <Request, Response>(
  axiosFn: AxiosFn<Request, Response>,
  dependency: DependencyList,
): UseAxiosReturn<Request, Response> => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AxiosResponse<Response> | null>(null);
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
        }
      })
      .catch((error) => {
        if (callId === lastCallId.current) {
          setError(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, dependency);

  return { isLoading, response, error, callback };
};

export default useAxios;
