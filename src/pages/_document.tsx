import Document, { Html, Head, Main, NextScript } from 'next/document';
import { isProduction } from '../utils/helper/checkType';

class MainDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          {isProduction() && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=GTM-KB7DZRJ`}
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
        </body>
      </Html>
    );
  }
}

export default MainDocument;
