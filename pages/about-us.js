import Layout from '../layouts/Main';
import Footer from '../components/footer/footer';
import Image from 'next/image';
import Link from 'next/link';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const AboutUs = () => {
  const {t} = useTranslation('about-us');
  return (
    <Layout>
    <section>
                <div className="pl-5 pr-5 md:pl-72 md:pr-72 text-justify">
                    <h1 className='text-center text-black mt-5 text-2xl'>{t('about_us')}</h1>

                    <p className='mt-5'>{t('text_1')}</p>

                    <Image
                    src={'/images/bmw_image.webp'}
                    width={600}
                    height={400}
                    className='ml-auto mr-auto mt-5 mb-5'
                    >
                      
                    </Image>

                    <p className='mt-5'>{t('text_2')} <Link className='underline hover:text-orange-400' href="https://autotoni.hr" rel="noopener noreferrer" target="_blank">{t('here')}.</Link>
                     </p>
                     <div className='mt-5'>
                    <iframe className="w-full " 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11255.417251368714!2d18.9444065!3d45.1495475!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xca71067a4d57dbc2!2sAutoservis%20Toni!5e0!3m2!1shr!2shr!4v1670788455744!5m2!1shr!2shr" 
                     width="600"
                     height="350" 
                     allowfullscreen="" 
                     loading="eager"
                     referrerpolicy="no-referrer-when-downgrade">
                     </iframe>
                 </div>
                </div>
            </section>
    <Footer />
  </Layout>
  )
}
  
  
export default AboutUs


export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'return', 'footer', 'header', 'about-us',
      ])),
    },
  }
}