import Layout from '../layouts/Main';
import Footer from '../components/footer/footer';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const Returns = () => {
    const {t} = useTranslation('returns');
    return (
        <Layout>
            <section>
                <div className="pl-5 pr-5 md:pl-72 md:pr-72 text-justify page-size">
                    <h1 className='text-center text-black mt-5 text-2xl'>{t('returns_policy')}</h1>

                    {/* TODO: Update this text */}

                    <p className='mt-10'>{t('text_1')}
                    </p>
                    <p className='mt-10'>{t('text_2')}</p>
                    <p className='mt-10'>{t('text_3')}
                    </p>
                </div>
            </section>
            <Footer />
        </Layout>
    )
}


export default Returns

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'return', 'footer', 'header', 'returns',
        ])),
      },
    }
  }