export const theme = {
  colors: {
    white: '#FFFFFF',
    bgGray: '#F3F3F3',
    bgLightGray: '#F9F9F9',
    lightGray: '#E8E8E8',
    mediumGray: '#999999',
    darkGray: '#666666',
    blackGray: '#222222',
    red: '#FF4B4B',
  },
};

export type ThemeColors = keyof typeof theme.colors;
