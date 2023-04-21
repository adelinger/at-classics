import { ThemeProvider } from '@emotion/react';
import { LinearProgress } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { yellowTheme } from '../../utils/assets/yellowTheme';
import { pageLimit } from '../../utils/constants/pageLimit';
import { getCurrentPage } from '../../utils/getCurrentPage';
import ProductsList from './list/productsList';

const ProductsContent = ({ selectedTags, priceFilter, data, placeHolder }) => {
  const [orderProductsOpen, setOrderProductsOpen] = useState(false);
  const [limit, setLimit] = useState(pageLimit);
  const [productCount, setProductCount] = useState();
  const [totalCount, setTotalCount] = useState();
  const router = useRouter();
  const currentPage = router.query.cid
  const [sortOrder, setSortOrder] = useState();
  const {t} = useTranslation(['products', 'common']);

  const title = getCurrentPage(currentPage)

  return (
    <section className="products-content">
      {
        currentPage === 'new-arrivals' &&
        <div className='text-center'>
          <h1 className='text-4xl text-orange-400'>{t('new_arrivals')}</h1>
        </div>

      }
      <div className="products-content__intro">
        <h2 className='text-left capitalize'> {title ? (currentPage === 'home-and-living' ? t('home_and_living') : t(title.toLowerCase())) : t('all_products')} <span>{productCount !== 0 && productCount}</span></h2>
        <button type="button" onClick={() => setOrderProductsOpen(!orderProductsOpen)} className="products-filter-btn"><i className="icon-filters"></i></button>
        <form className={`products-content__filter ${orderProductsOpen ? 'products-order-open' : ''}`}>
          {
            productCount !== 0 &&
            <div className="products__filter__select">
              <h4 className='text-black'>{t('sort_by')} </h4>
              <div className="select-wrapper">
                <select onChange={(e) => { setSortOrder(e.target.value) }}>
                  <option selected={router.query.sortOrder == 'createdDesc'} value="createdDesc">{t('newest')}</option>
                  <option selected={router.query.sortOrder == 'createdAsc'} value='createdAsc'>{t('oldest')}</option>
                  <option selected={router.query.sortOrder == 'priceAsc'} value='priceAsc'>{t('price_lowest')}</option>
                  <option selected={router.query.sortOrder == 'priceDesc'} value='priceDesc'>{t('price_highest')}</option>
                </select>
              </div>
            </div>
          }
        </form>
      </div>
      {
        productCount === 0 &&
        <div className='text-center'><p>{t('no_product_found')}</p></div>
      }

      <ProductsList
        data={data}
        limit={limit}
        sortOrder={sortOrder}
        selectedTags={selectedTags}
        setProductCount={setProductCount}
        setTotalCount={setTotalCount}
        priceFilter={priceFilter}
        placeHolder={placeHolder}
      />

      {
         totalCount > limit &&
        <div className='text-center'>
          <button className='btn-yellow-rounded-outline' onClick={() => { setLimit(limit + pageLimit);  }}>
            {t('show_more')}
          </button>
        </div>
      }

    </section>
  );
};

export default ProductsContent
