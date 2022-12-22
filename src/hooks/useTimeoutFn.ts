import { useCallback, useEffect, useRef } from 'react';

type TUseTimeoutFn = (fn: () => void, ms: number) => [run: () => void, clear: () => void];

const useTimeoutFn: TUseTimeoutFn = (fn, ms) => {
  const timeoutId = useRef<NodeJS.Timeout>();
  const callback = useRef(fn);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      callback.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timeoutId.current && clearTimeout(timeoutId.current);
  }, []);

  useEffect(() => clear, [clear]);

  return [run, clear];
};

export default useTimeoutFn;
