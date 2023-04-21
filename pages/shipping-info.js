import Layout from '../layouts/Main';
import Footer from '../components/footer/footer';
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ShippingInfo = () => {
  const { t } = useTranslation('shipping')
  return (
    <Layout>
      <section>
        <div className="pl-5 pr-5 md:pl-72 md:pr-72 text-justify page-size">
          <h1 className='text-center text-black mt-5 text-2xl'>{t('title_1')}</h1>

          <p className='mt-10'>{t('text_1')}</p>
            
            <h2 className='text-black text-l font-bold mt-10'>{t('title_2')}</h2>
          <p>{t('text_2')}</p>

           <h2 className='text-black text-l font-bold mt-10'>{t('title_3')}</h2>
          <p>{t('text_3')}</p>

          <p>{t('text_4')}</p>
        </div>
      </section>
      <Footer />
    </Layout>
  )
}

export default ShippingInfo

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'shipping', 'footer', 'header',
      ])),
    },
  }
}