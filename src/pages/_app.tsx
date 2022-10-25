import '../assets/fonts/font.css';
import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '~/types/theme';
import Header from '~/components/common/Header';
import MainContainer from '~/components/common/MainContainer';
import Footer from '~/components/common/Footer';
import * as gtag from '../lib/gtag';
import Script from 'next/script';
import { isProduction } from '../utils/helper/checkType';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {isProduction() && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtag.GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
            `,
            }}
          />
        </>
      )}

      <ThemeProvider theme={theme}>
        <Header />
        <MainContainer>
          <Component {...pageProps} />
        </MainContainer>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
