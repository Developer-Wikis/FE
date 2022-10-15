import { theme } from '~/types/theme';

export const buttonStyle = {
  black: `
    background-color: ${theme.colors.blackGray};
    color: white;
    border-radius: 4px;
  `,
  borderGray: `
    border: 1px solid ${theme.colors.lightGray};
    background-color: white;
    color: ${theme.colors.darkGray};
    border-radius: 4px;

    &:hover {
      background-color: ${theme.colors.bgLightGray};
    }
  `,
  red: `
    background-color: ${theme.colors.red};
    color: white;
    border-radius: 4px;
  `,
};

export const buttonSizes = {
  sm: `
    font-size: 14px;
    padding: 8px 12px;
  `,
  md: `
    font-size: 14px;
    padding: 12px 26px;
  `,
  lg: `
    font-size: 16px;
    padding: 12px 16px;
  `,
};
