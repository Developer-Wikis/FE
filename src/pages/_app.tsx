import '../assets/fonts/font.css';
import '../styles/globals.css';
import '../styles/reset.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '~/types/theme';
import Header from '~/components/common/Header';
import MainContainer from '~/components/common/MainContainer';
import Footer from '~/components/common/Footer';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GTM_ID, pageview } from '../lib/gtm';
import Script from 'next/script';
import { isProduction } from '../utils/helper/checkType';
import ToastContainer from '../components/common/Toast/index';

import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/react-query/queryClient';
import type { DehydratedState } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import AuthFallback from '~/components/base/ErrorBoundary/AuthFallback';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

function MyApp({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) {
  const router = useRouter();
  useEffect(() => {
    if (!isProduction()) return;
    router.events.on('routeChangeComplete', pageview);
    return () => router.events.off('routeChangeComplete', pageview);
  }, [router.events]);

  return (
    <>
      {isProduction() && (
        <>
          <Script
            id="gtag-base"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer', '${GTM_ID}');
            `,
            }}
          />
        </>
      )}
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <ErrorBoundary FallbackComponent={AuthFallback}>
              <Header />
              <MainContainer>
                <Component {...pageProps} />
              </MainContainer>
              <Footer />
              {ToastContainer.render()}
            </ErrorBoundary>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
