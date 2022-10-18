import Document, { Html, Head, Main, NextScript } from 'next/document';

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
          {/*modal container*/}
          <div id="portal"></div>
        </body>
      </Html>
    );
  }
}

export default MainDocument;
