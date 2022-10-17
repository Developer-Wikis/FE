export const theme = {
  colors: {
    white: '#FFFFFF',
    bgGray: '#F3F3F3',
    bgLightGray: '#F9F9F9',
    lightGray: '#E8E8E8',
    gray100: '#F9F9F9',
    gray200: '#F3F3F3',
    gray300: '#E8E8E8',
    gray400: '#CFCFCF',
    gray500: '#999999',
    gray600: '#666666',
    gray700: '#3F3F3F',
    gray800: '#222222',
    mediumGray: '#999999',
    darkGray: '#666666',
    blackGray: '#222222',
    red: '#FF4B4B',
    redDisabled: '#FF8B8B',
  },
  fontStyle: {
    headline1: `
      font-size:24px;
      font-weight: 700;
      line-height: 36px;
    `,
    subtitle1: `
      font-size: 18px;
      font-weight: 600;
      line-height: 1.5;
    `,
    subtitle2: `
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
    `,
    body1: `
      font-size: 16px;
      line-height: 1.5;
    `,
    body2: `
      font-size: 14px;
      line-height: 1.5;
    `,
    caption: `
      font-size: 13px;
      line-height: 1.5;
    `,
  },
};

export type ThemeColors = keyof typeof theme.colors;
export type ThemeFontStyle = keyof typeof theme.fontStyle;
