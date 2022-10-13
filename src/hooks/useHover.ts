import { useState, useRef, useEffect, useCallback, RefObject } from 'react';

const useHover = <T extends Element>(): [RefObject<T>, boolean] => {
  const [isHover, setIsHover] = useState(false);
  const ref = useRef<T>(null);

  const handleMouseOver = useCallback(() => setIsHover(true), []);
  const handleMouseOut = useCallback(() => setIsHover(false), []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('mouseover', handleMouseOver);
    element.addEventListener('mouseout', handleMouseOut);

    return () => {
      element.removeEventListener('mouseover', handleMouseOver);
      element.removeEventListener('mouseout', handleMouseOut);
    };
  }, [ref.current, handleMouseOver, handleMouseOut]);

  return [ref, isHover];
};

export default useHover;
