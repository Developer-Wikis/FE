import { theme } from '~/types/theme';

export const buttonStyle = {
  black: `
    background-color: ${theme.colors.blackGray};
    color: white;
  `,
  borderGray: `
    border: 1px solid ${theme.colors.lightGray};
    background-color: white;
    color: ${theme.colors.darkGray};
  `,
};

export const buttonSizes = {
  sm: `
    font-size: 14px;
    padding: 8px 10px;
  `,
  md: `
    font-size: 14px;
    padding: 12px 26px;
  `,
};
