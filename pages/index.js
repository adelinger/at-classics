import Layout from '../layouts/Main';
import PageIntro from '../components/page-intro/pageIntro';
import ProductsFeatured from '../components/products-featured/productsFeatured';
import Footer from '../components/footer/footer';
import Subscribe from '../components/subscribe';
import { useEffect, useState } from 'react';
import { getPlaiceholder } from 'plaiceholder';
import { blurImageUrl } from '../utils/constants/blurImageUrl';
import { getFeaturedProducts, getLatestProducts, getProducts } from '../utils/apiCalls';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link';
import { useTranslation } from 'next-i18next'

const IndexPage = ({imageProps, featuredProducts, latestProducts}) => {
  const { t } = useTranslation('index')
  const [moveSlide, setMoveSlide] = useState();
  const [products, setProducts] = useState();
  const [newestProducts, setNewestProducts] = useState();
  
  useEffect( () => {
    setProducts(featuredProducts)
    setNewestProducts(latestProducts)
  }, [featuredProducts])


//   setTimeout(() => {
//     setMoveSlide(!moveSlide);
// }, 10000);

  return (
    <Layout>
      <PageIntro t={t} products={products} placeHolder={imageProps} moveSlide={moveSlide} />

      <section className="featured -mt-16 md:mt-44">
          <header className="text-3xl text-center mb-10">
            <h4 className='text-black font-light'>{t('variaty_of_products')}</h4>
          </header>
        <div className="container">
          <article style={{backgroundImage: 'url(/images/ds_hoodie.webp)'}} className="featured-item featured-item-large">
            <div className="z-10 background-black-opacity-28">
              <h3 className='text-white font-normal text-2xl text-white absolute'>{t('clothing')}</h3>
              <Link href="/products/accessories" className="btn-yellow-rounded absolute right-0 bottom-0">{t('show_collection_btn')}</Link>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(/images/beetle_bag.webp)'}} className="featured-item featured-item-small-first">
          <div className="z-10 background-black-opacity-28">
          <h3 className='text-white font-normal text-2xl absolute md:-mt-8'>{t('accessories')} </h3>
          <Link href="/products/clothing" className="btn-yellow-rounded absolute right-0 bottom-0">{t('more_details')}</Link>
            </div>
          </article>
          
          <article style={{backgroundImage: 'url(/images/beetle_mug.webp)'}} className="featured-item featured-item-small">
          <div className="z-10 background-black-opacity-28">
           <h3 className='text-white font-normal text-2xl absolute md:-mt-9'>{t('home_and_living')}</h3>
           <Link href="/products/home-and-living" className="btn-yellow-rounded absolute right-0 bottom-0">{t('view_all')}</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container md:mt-20">
          <header className="section__intro">
            <h4 className='text-black'>{t('why_choose_us')}</h4>
          </header>

          <ul className="shop-data-items">
            <li>
              <i class="fa-solid fa-headset"></i>
              <div className="data-item__content">
                <h4 className='text-black'>{t('great_support')}</h4>
                <p>{t('great_support_text')}</p>
              </div>
            </li>
            
            <li>
              <i className="icon-payment"></i>
              <div className="data-item__content">
                <h4 className='text-black'>{t('easy_payments')}</h4>
                <p>{t('easy_payments_text')}</p>
              </div>
            </li>
            
            <li>
              <i className="icon-cash"></i>
              <div className="data-item__content">
                <h4 className='text-black'>{t('money_back')}</h4>
                <p>{t('money_back_text')}</p>
              </div>
            </li>
            
            <li>
              <i className="icon-materials"></i>
              <div className="data-item__content">
                <h4 className='text-black'>{t('finest_quality')}</h4>
                <p>{t('finest_quality_text')}</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
      
      <ProductsFeatured placeHolder={imageProps} data={newestProducts} showButtons={true} title={t('latest_arrivals')}/>
      <Subscribe t={t} />
      <Footer />
    </Layout>
  )
}


export default IndexPage


export const getServerSideProps = async ({locale}) => {
  const featuredProducts = await getFeaturedProducts(locale);
  const latestProducts = await getLatestProducts(locale);

  const { base64, img } = await getPlaiceholder(blurImageUrl);

  return {
    props: {
      featuredProducts,
      latestProducts,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
      ...await serverSideTranslations(locale ?? 'en', ['common', 'index', 'header', 'footer']),
    }
  };
}