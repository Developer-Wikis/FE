import '../assets/fonts/font.css';
import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '~/types/theme';
import Header from '~/components/common/Header';
import MainContainer from '~/components/common/MainContainer';
import Footer from '~/components/common/Footer';
import Script from 'next/script';
import { isProduction } from '../utils/helper/checkType';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageview } from '../lib/gtm';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    if (!isProduction()) return;
    router.events.on('routeChangeComplete', pageview);
    return () => router.events.off('routeChangeComplete', pageview);
  }, [router.events]);

  return (
    <>
      {isProduction() && (
        <Script
          id="gtag-base"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', 'GTM-KB7DZRJ');
          `,
          }}
        />
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
