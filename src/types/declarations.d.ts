import '@emotion/react';
import { ThemeColors, ThemeFontStyle } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      [key in ThemeColors]: string;
    };
    fontStyle: {
      [key in ThemeFontStyle]: string;
    };
  }
}
export {};
