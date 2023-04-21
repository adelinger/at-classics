import Layout from '../../layouts/Main';
import Footer from '../../components/footer/footer';
import { Alert, AlertTitle } from '@mui/material';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const CheckoutCompleted = () => {
    const [orderId, setOrderId] = useState('');
    const router = useRouter();
        useEffect(() => {
           setOrderId(router.query.orderId)
        }, [router]);

        const {t} = useTranslation('checkout');
    
    return (
        <Layout>
      <div className="container mx-auto my-10 p-10 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-semibold text-center">
            {t('congratulations')}
          </h1>
          <p className="text-lg text-gray-500 text-center mb-4 mt-4">
            {t('order_completed_successfully')}
          </p>
          <p className="text-lg text-gray-500 text-center mb-4">
            {t('we_will_start')}
          </p>
          <p className="text-lg text-gray-500 text-center mb-4">
            {t('order_number')} {orderId}
          </p>
          <div className="mt-6">
            <Link
            href={'/'}
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-400 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
             
            >
              {t('go_back_home')}
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
    )
}


export default CheckoutCompleted

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'return', 'footer', 'header', 'checkout',
      ])),
    },
  }
}