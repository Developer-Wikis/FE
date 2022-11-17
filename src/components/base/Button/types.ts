import { theme } from '~/types/theme';

export const buttonStyle = {
  black: `
    background-color: ${theme.colors.gray700};
    color: ${theme.colors.white};
    border-radius: 4px;
  `,
  borderGray: `
    border: 1px solid ${theme.colors.gray300};
    background-color: ${theme.colors.white};
    color: ${theme.colors.gray600};
    border-radius: 4px;

    &:hover {
      background-color: ${theme.colors.gray100};
    }
  `,
  gray: `
    background-color: ${theme.colors.gray500};
    color: ${theme.colors.white};
    border-radius: 4px;

    &:hover {
      background-color: ${theme.colors.gray600};
    }
  `,
  red: `
    background-color: ${theme.colors.red};
    color: ${theme.colors.white};
    border-radius: 4px;
  `,
};

export const buttonSizes = {
  xs: `
    font-size: 12px;
    padding: 5px 11px;
    line-height: 20px;
    font-weight: 500;
  `,
  sm: `
    ${theme.fontStyle.body2_500}
    padding: 8px 12px;
  `,
  md: `
    ${theme.fontStyle.body2_500}
    padding: 12px 26px;
  `,
  lg: `
    ${theme.fontStyle.body1_500}
    padding: 12px 16px;
  `,
};
