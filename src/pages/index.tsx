import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '~/components/common/Header';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Developer Wiki</title>
        <meta name="description" content="Developer Wiki" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
      </main>
    </div>
  );
};

export default Home;
