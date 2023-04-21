import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Checkbox from './form-builder/checkbox';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';

// data
import carTypes from '../../utils/data/car-types';
import { clothingTypes } from '../../utils/data/clothingTypes';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'next-i18next';
const { Handle } = Slider;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

const ProductsFilter = ({ selectedTags, setSelectedTags, priceFilter, setPriceFilter }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const router = useRouter();
  const currentPage = router.query.cid;
  const {t} = useTranslation(['products', 'common']);
  const locale =  router.locale;

  const addQueryParams = () => {
    // query params changes
  }

  const onPriceChange = (e) => {
    let prices = [];
    prices.push(e[0]*100)
    prices.push(e[1]*100)
    setPriceFilter(prices);
  }

  useEffect(() => {
    if(!selectedTags || selectedTags.length === 0){
      router.query.tagFilters && setSelectedTags(router.query.tagFilters)
    }
  }, [selectedTags]);

  const onTagChanged = (e, name) => {
    if (e.target.checked) {
      setSelectedTags(selectedTags => [...selectedTags, name])
    } else {
      if(selectedTags.constructor !== Array || selectedTags.length === 1){
        setSelectedTags([]);
        delete router.query.tagFilters;
        router.push(router)
      }else{
        setSelectedTags(selectedTags?.filter(i => i !== name))
      }
    }
    setFiltersOpen(!filtersOpen);
  }


  return (
    <form className="products-filter" onChange={addQueryParams}>
      <button type="button"
        onClick={() => setFiltersOpen(!filtersOpen)}
        className={`products-filter__menu-btn ${filtersOpen ? 'products-filter__menu-btn--active' : ''}`}>
        {t('add_filter')} <i className="icon-down-open"></i>
      </button>

      <div className={`products-filter__wrapper ${filtersOpen ? 'products-filter__wrapper--open' : ''}`}>
        {currentPage === 'clothing' &&
          <div className="products-filter__block">
            <button type="button">{t('clothing_type')}</button>
            <div className="products-filter__block__content">
              {clothingTypes.map(type => (
                <Checkbox
                  key={type.id}
                  name={type.name}
                  type='checkbox'
                  label={t(type.lang_tag)}
                  queryTags={selectedTags}
                  onChange={(e) => onTagChanged(e, t(type.lang_tag, {lng:'en'}))}
                />
              ))}
            </div>
          </div>
        }
        <div className="products-filter__block">
          <button type="button">{t('car_brands')}</button>
          <div className="products-filter__block__content">
            {carTypes.map(type => (
              <Checkbox
                key={type.id}
                name={type.name}
                type='checkbox'
                label={locale === 'hr' && type.name === 'Other cars' ? 'Ostali auti' : type.name}
                queryTags={selectedTags}
                onChange={(e) => onTagChanged(e,type.name)}
              />
            ))}
          </div>
        </div>

        <div className="products-filter__block">
          <button type="button">{t('price')}</button>
          <div className="products-filter__block__content">
            <Slider
             range min={1} max={500} defaultValue={[1, 500]} tipFormatter={value => `${value}€`} 
             onChange={onPriceChange}
            >
            </Slider>

            {priceFilter.length > 0 && (priceFilter[0] !== 100 || priceFilter[1] !== 50000) && <p className='ml-2 mt-5'> {priceFilter[0]/100}€ - {priceFilter[1]/100}€</p>} 
          </div>
        </div>

      </div>
    </form>
  )
}

export default ProductsFilter
