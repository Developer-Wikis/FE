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
          <Main />
          <NextScript />

          {isProduction() && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
              }}
            />
          )}

          {/*modal container*/}
          <div id="portal"></div>
        </body>
      </Html>
    );
  }
}

export default MainDocument;
