import { useEffect } from 'react';
import useTimeoutFn from './useTimeoutFn';

type TUseTimeout = (fn: () => void, ms: number) => () => void;

const useTimeout: TUseTimeout = (fn, ms) => {
  const [run, clear] = useTimeoutFn(fn, ms);

  useEffect(() => {
    run();
    return clear;
  }, [run, clear]);

  return clear;
};

export default useTimeout;
