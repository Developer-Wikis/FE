import '@emotion/react';
import { ThemeColors, ThemeFontStyle, ThemeSpace } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      [key in ThemeColors]: string;
    };
    fontStyle: {
      [key in ThemeFontStyle]: string;
    };
    space: {
      [key in ThemeSpace]: string;
    };
  }
}
export {};
