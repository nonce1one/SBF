import Head from 'next/head';
import Layout from '../compenents/Layout';
import { useConnect } from 'wagmi';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Layout>
      <div className="container">
        <h1>home Page</h1>
        <h3>canvas app</h3>
      </div>
    </Layout>
  );
}
