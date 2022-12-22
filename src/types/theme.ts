export const theme = {
  colors: {
    white: '#FFFFFF',
    gray100: '#F9F9F9',
    gray200: '#F3F3F3',
    gray300: '#E8E8E8',
    gray400: '#CFCFCF',
    gray500: '#999999',
    gray600: '#666666',
    gray700: '#3F3F3F',
    gray800: '#222222',
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
    body1_500: `
      font-size: 16px;
      line-height: 1.5;
      font-weight: 500;
    `,
    body1_600: `
      font-size: 16px;
      line-height: 1.5;
      font-weight: 600;
    `,
    body2: `
      font-size: 14px;
      line-height: 20px;
    `,
    body2_500: `
      font-size: 14px;
      line-height: 20px;
      font-weight: 500;
    `,
    body2_600: `
      font-size: 14px;
      line-height: 20px;
      font-weight: 600;
    `,
    caption: `
      font-size: 13px;
      line-height: 1.5;
    `,
  },
  space: {
    mobileSide: '16px',
  },
};

export type ThemeColors = keyof typeof theme.colors;
export type ThemeFontStyle = keyof typeof theme.fontStyle;
export type ThemeSpace = keyof typeof theme.space;
