import Head from 'next/head';

interface SEOProps {
  title: string;
  description?: string;
  withSuffix?: boolean;
}

const SEO = ({
  title,
  description = '기술 면접 준비는 Developer Wiki에서!',
  withSuffix = false,
}: SEOProps) => {
  const processedTitle = title.trim() + (withSuffix ? ' | Developer Wiki' : '');

  return (
    <Head>
      <title>{processedTitle}</title>
      <meta property="description" content={description.trim()} />
      <meta property="og:title" content={processedTitle} />
      <meta property="og:description" content={description.trim()} />
      <meta property="og:image" content="/assets/developerwiki.png" />
    </Head>
  );
};

export default SEO;
