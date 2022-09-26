import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '~/types/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}

export default MyApp;
