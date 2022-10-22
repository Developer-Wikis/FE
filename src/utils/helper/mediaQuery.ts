const sizes: Record<string, string> = {
  md: '620px',
};

export const mediaQuery = (size: 'md' | string) => {
  return `@media screen and (max-width: ${size.includes('px') ? size : sizes[size]})`;
};
