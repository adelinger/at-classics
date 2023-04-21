import { useEffect, useState } from 'react';
import Footer from '../../components/footer/footer';
import Layout from '../../layouts/Main';
import Breadcrumb from '../../components/breadcrumb/breadcrumb';
import ProductsFeatured from '../../components/products-featured/productsFeatured';
import Gallery from '../../components/product-single/gallery/gallery';
import Content from '../../components/product-single/content/productContent';
import Description from '../../components/product-single/description/productDescription';

import { getRelatedProducts, getSingleProduct } from '../../utils/apiCalls';
import { getPlaiceholder } from "plaiceholder";
import { blurImageUrl } from '../../utils/constants/blurImageUrl';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Product = ({ product, imageProps, relatedProducts }) => {
  const [showBlock, setShowBlock] = useState('description');
  const [selectedColor, setSelectedColor] = useState();
  const [images, setImages] = useState(product.defaultImages);
  const [related, setRelated] = useState();

  const tag = ["Men's Clothing", "Women's Clothing", "Kid's Clothing"].find(tag => product["tags"].includes(tag)) 
  || ["Accessories", "Home & Living"].find(tag => product["tags"].includes(tag)) || "Clothing";

  useEffect(() => {
    if (selectedColor) {
      setImages(product.images.filter(e => e.colorID === selectedColor.id));
    }

  }, [selectedColor]);

  useEffect( () => {
    setRelated(relatedProducts);
  }, [relatedProducts])

  useEffect( () => {
   setImages(product.defaultImages)
  }, [product.defaultImages])


  return (
    <Layout>
      <Breadcrumb previousPage={tag === "Men's Clothing" || tag === "Women's Clothing" || tag === "Kid's Clothing" ? 'Clothing' : tag} currentPage={product.title} />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={images} productName={product.title} defaultImage={images[0]?.src} placeHolder={imageProps} />
            <Content product={product} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
             
            </div>

            <Description product={product} show={showBlock === 'description'} />
            {/* <Reviews product={product} show={showBlock === 'reviews'} /> */}
          </div>
        </div>
      </section>

      <div className="product-single-page">
        {/* TODO: add related products here - implement on backend */}
        <ProductsFeatured data={related} placeHolder={imageProps} showButtons={true} title={'Related items'}/>
      </div>
      <Footer />
    </Layout>
  );
}

export default Product

export async function getServerSideProps({ query, locale }) {
  const pid = query.pid;
  const relatedProducts = await getRelatedProducts(pid, locale);
  const product = await getSingleProduct(pid, locale);
  const { base64, img } = await getPlaiceholder(blurImageUrl);

  return {
    props: {
      product,
      relatedProducts,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
      ...await serverSideTranslations(locale ?? 'en', ['header', 'footer', 'products', 'common']),
    },
  }
}