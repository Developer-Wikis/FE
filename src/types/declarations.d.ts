import '@emotion/react';
import { ThemeColors } from './theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      [key in ThemeColors]: string;
    };
  }
}
export {};
