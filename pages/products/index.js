import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { getPlaiceholder } from 'plaiceholder';
import { getProducts } from '../../utils/apiCalls';
import { blurImageUrl } from '../../utils/constants/blurImageUrl';
import { getFetchUrl } from '../../utils/data/getFetchUrl';
import ProductsCategory from './[cid]';

const Products = ({data, imageProps}) => {
  return (
  <ProductsCategory data={data} imageProps={imageProps}>

  </ProductsCategory>
  )
}
  
  
export default Products


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