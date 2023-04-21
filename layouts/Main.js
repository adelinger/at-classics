import Head from 'next/head';
import Header from '../components/Header/header';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default ({ children,title = 'AT Classics Ecommerce' }) => {
  const router = useRouter();
  const pathname = router.pathname;
  

  return (
    <div className="app-main">
      <Head>
        <title>{ title }</title>
      </Head>

      <Header />

      <main className={(pathname !== '/' ? 'main-page' : '')}>
        {children}
      </main>
    </div>
  )
}