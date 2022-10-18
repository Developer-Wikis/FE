import { theme } from '~/types/theme';

export const buttonStyle = {
  black: `
    background-color: ${theme.colors.gray700};
    color: white;
    border-radius: 4px;
  `,
  borderGray: `
    border: 1px solid ${theme.colors.gray300};
    background-color: white;
    color: ${theme.colors.gray600};
    border-radius: 4px;

    &:hover {
      background-color: ${theme.colors.gray100};
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
    ${theme.fontStyle.body2}
    padding: 8px 12px;
  `,
  md: `
    ${theme.fontStyle.body2}
    padding: 12px 26px;
  `,
  lg: `
    ${theme.fontStyle.body1}
    padding: 12px 16px;
  `,
};
