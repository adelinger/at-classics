import ProductItem from '../../product-item/productItem';
import ProductsLoading from './loading';
import { imageNotAvailable } from '../../../utils/imageNotAvailable';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { pageLimit } from '../../../utils/constants/pageLimit';

const ProductsList = ({ data, selectedTags, sortOrder, limit, setProductCount, 
              setTotalCount, priceFilter, placeHolder }) => {
  const router = useRouter();
  const [products, setProducts] = useState(data?.product);

  useEffect(() => {
    if(!selectedTags || selectedTags.length === 0){
      delete router.query.tagFilters
      router.push(router) 
    }else{
      router.push({
        pathname: router.pathname,
        query: { ...router.query, tagFilters: selectedTags },
      }, null, {scroll:false} )
    } 
     
  }, [selectedTags]);

  useEffect(() => {
    data && setProducts(data?.product);
    data?.product?.length > 0 ? setProductCount(data?.product?.length) : setProductCount(0);
    data && data?.product?.length > 0 ? setTotalCount(data.total) : setTotalCount(0)
  }, [data]);

  useEffect(() => {
    if (limit && limit !== pageLimit) {
        router.push({
          pathname: router.pathname,
          query: { ...router.query, limit: limit },
        }, null, {scroll:false} )

    }
  }, [limit]);

  useEffect(() => {
    if (priceFilter.length > 0) {
      if (data) {
        setProducts(data?.product.filter(p => p.lowestPrice > priceFilter[0] && p.lowestPrice < priceFilter[1]));
      }
    }
  }, [priceFilter]);

  useEffect(() => {
    if (sortOrder) {
        setProducts(null);
        router.push({
          pathname: router.pathname,
          query: { ...router.query, sortOrder: sortOrder },
        })
    }
  }, [sortOrder]);

  return (
    <>
      {!products &&
        <ProductsLoading />
      }

      {products &&
        <section className="products-list">
          {products.map(item => (
            <ProductItem
              discount={item.discount}
              key={item.id}
              id={item.id}
              price={item.lowestPrice}
              currentPrice={item.lowestPrice}
              productImage={item.featuredImageSrc ? item.featuredImageSrc : imageNotAvailable}
              name={item.title}
              quickCart={item.availableColors?.length > 0 || item.availableSizes?.legnth > 0 ? false : true}
              currency={item.currency}
              placeHolder={placeHolder}
              variant_id={item.defaultVariantID}
            />
          ))}
        </section>
      }
      
    </>
  );
};

export default ProductsList