import Layout from '../layouts/Main';
import ShoppingCart from '../components/shopping-cart/shoppingCart';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Products = () => {

  return (
    <Layout>
    <ShoppingCart/>
  </Layout>
  )
 

};

export default Products

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'header', 'footer','checkout',
      ])),
    },
  }
}