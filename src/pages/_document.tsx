import Document, { Html, Head, Main, NextScript } from 'next/document';
import { isProduction } from '../utils/helper/checkType';
import { GTM_ID } from '../lib/gtm';
import Favicon from '~/components/base/Favicon';

class MainDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head>
          <Favicon />
        </Head>
        <body>
          {isProduction() && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}

          <Main />
          <NextScript />

          {/*modal container*/}
          <div id="portal"></div>
          <div id="toast-portal"></div>
        </body>
      </Html>
    );
  }
}

export default MainDocument;
