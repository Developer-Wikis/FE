import '../assets/fonts/font.css';
import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '~/types/theme';
import Header from '~/components/common/Header';
import MainContainer from '~/components/common/MainContainer';
import Footer from '~/components/common/Footer';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
      <Footer />
    </ThemeProvider>
  );
}

export default MyApp;
