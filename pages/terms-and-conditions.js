import Layout from '../layouts/Main';
import Footer from '../components/footer/footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const TermsAndConditions = () => {
  const {t} = useTranslation('toc');

  return (
    <Layout>
      <section>
        <div className="pl-5 pr-5 md:pl-72 md:pr-72 text-justify page-size">
          <h1 className='text-center text-black mt-5 text-2xl'>{t('terms_and_conditions')}</h1>
          <p className='mt-10'>
            {t('text_1')}
          </p> <br></br>
          <p>
            {t('text_2')}
          </p> <br></br>
          <p>
           {t('text_3')}
          </p> <br></br>  
          <p>
            {t('text_4')}
          </p> <br></br>
          <p>
            {t('text_5')}
          </p> <br></br>
          {/* <p>
            {t('text_6')}
          </p> <br></br> */}
          <p>
            {t('text_7')}
          </p> <br></br>
          <p>
           {t('text_8')}
          </p> <br></br>
          <p>
            {t('text_9')}
          </p> <br></br>
          <p>
            {t('text_10')}
          </p>
        </div>
      </section>
      <Footer />
    </Layout>
  )
}


export default TermsAndConditions

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'return', 'footer', 'header', 'toc',
      ])),
    },
  }
}