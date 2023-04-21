import Layout from '../../layouts/Main';
import Footer from '../../components/footer/footer';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import ProductsFilter from '../../components/products-filter/productsFilter';
import ProductsContent from '../../components/products-content/productsContent';
import { useEffect, useState } from 'react';
import { getProducts } from '../../utils/apiCalls';
import { getPlaiceholder } from 'plaiceholder';
import { blurImageUrl } from '../../utils/constants/blurImageUrl';
import { getCurrentPage } from '../../utils/getCurrentPage';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ProductsCategory = ({data, imageProps}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [priceFilter, setPriceFilter] = useState([]);
  const router = useRouter();
  const currentPageUrl = router.query.cid;
  const currentPage = getCurrentPage(currentPageUrl);

  useEffect(() => {

  }, []);
  
  return (
  <Layout title='AT-classics Products'>
    <Breadcrumb currentPage={currentPage} />
    <section className="products-page">
    <div className='max-w-5xl ml-auto mr-auto mb-5 -mt-5'>
       </div>
      <div className="container">
        <ProductsFilter selectedTags={selectedTags} setSelectedTags={setSelectedTags} priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
        <ProductsContent 
        selectedTags={selectedTags} 
        priceFilter={priceFilter}
        data={data}
        placeHolder={imageProps}
        />
      </div>
    </section>
    <Footer />
  </Layout>
  );
}
  
  
export default ProductsCategory

export async function getServerSideProps({ query, locale }) {
  const data = await getProducts(query, locale);

  const { base64, img } = await getPlaiceholder(blurImageUrl);

  return {
    props: {
      data,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
      ...await serverSideTranslations(locale ?? 'en', [ 'header', 'footer', 'products', 'common']),
    }
  };
}
