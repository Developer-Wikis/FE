import { isString } from './checkType';

const sizes: Record<string, string> = {
  sm: '620px',
};

export const mediaQuery = (size: 'sm' | number) => {
  return `@media screen and (max-width: ${isString(size) ? sizes[size] : `${size}px`})`;
};
