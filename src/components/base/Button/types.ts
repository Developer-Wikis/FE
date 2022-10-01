import { theme } from '~/types/theme';

export const buttonStyle = {
  black: `
    font-size: 14px;
    padding: 12px 26px;
    background-color: ${theme.colors.blackGray};
    color: white;
  `,
  borderGray: `
    font-size: 14px;
    padding: 12px 26px;
    border: 1px solid ${theme.colors.lightGray};
    background-color: white;
    color: ${theme.colors.darkGray};
  `,
};
