import { useEffect, useRef, useState } from 'react';

const useTimer = () => {
  const [isCounting, setIsCounting] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  let timer = useRef<null | NodeJS.Timer>(null);

  const onStart = () => {
    setIsCounting(true);
  };

  const onStop = () => {
    setIsCounting(false);
  };

  const onFinish = () => {
    setIsCounting(false);
    setSeconds(0);
    setMinutes(0);
  };

  useEffect(() => {
    if (isCounting) {
      timer.current = setInterval(() => {
        if (seconds < 59) {
          setSeconds(seconds + 1);
        }
        if (seconds === 59) {
          if (minutes === 1) {
            clearInterval(timer.current!);
          } else {
            setMinutes(minutes + 1);
            setSeconds(0);
          }
        }
      }, 1000);
    } else {
      if (timer.current !== null) {
        clearInterval(timer.current);
      }
    }

    return () => {
      clearInterval(timer.current!);
    };
  }, [minutes, seconds, isCounting]);

  return {
    minutes,
    seconds,
    onStart,
    onStop,
    onFinish,
  };
};

export default useTimer;
