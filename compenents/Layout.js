import Head from 'next/head';
import Header from './Header';

export default function Layout({ title, keywords, description, children }) {
  return (
    <div>
      <Head>
        <title>SBF Makeover</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      <div>{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: 'SBF Makeover',
  description: 'give the SBF a makeover and MINT your art!',
  keywords: 'SBF art makeover NFT polygon draw color portrait',
};
