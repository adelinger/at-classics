import React, { useState } from 'react';
import CheckboxColor from '../../products-filter/form-builder/checkbox-color';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../../store/actions/cartActions';
import { currencyFormatter } from '../../../utils/priceFormat';
import { Button, IconButton, Snackbar, ThemeProvider } from '@mui/material';
import Link from 'next/link';
import { yellowTheme } from '../../../utils/assets/yellowTheme';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { convertKuna } from '../../../utils/constants/convertKuna';
import { useTranslation } from 'next-i18next';

const Content = ({ product, selectedColor, setSelectedColor }) => {
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [showSnack, setShowSnack] = useState();
  const {t} = useTranslation('products');
  
  const { favProducts } = useSelector(state => state.user);
  //const isFavourite = some(favProducts, productId => productId === product.id);
  const defaultVariant = product.variants.find(e => e.is_Default === true);
  const defaultSize = product.options.filter(option => option.name === 'Sizes')
                          .find(o => true)?.values.filter(item => defaultVariant.options.includes(item.id)).find(o => true);

  const defaultColorOption = product.options.find(option => option.name === 'Colors');
  const defaultColor = defaultColorOption && defaultColorOption.values.find(item => defaultVariant.options.includes(item.id));

  const defaultOption = product.options.filter(option => option.name !== 'Sizes' && option.name !== 'Colors')
                          .find(o => true)?.values?.filter(item => defaultVariant.options.includes(item.id)).find(o => true);

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [itemSize, setItemSize] = useState(defaultSize);
  const [color, setColor] = useState(defaultColor);
  const [otherOption, setOtherOption] = useState(defaultOption);

  const productsColors = product.availableColors;
  const productsSizes = product.availableSizes;
  const otherProductOptions = product.options.filter(option => option.name !== 'Colors' && option.name !== 'Sizes')[0];

  const router = useRouter();
  const currentId = router.query.pid;


  //useless feature?
  // const toggleFav = () => { 
  //   dispatch(toggleFavProduct(
  //     {
  //       id: product.id,
  //     }
  //   ))
  // }

  useEffect( () => {
    const options = [itemSize?.id];
    if (color) options.push(color.id);
    if (otherOption) options.push(otherOption.id);

    const match = product.variants.find(variant => options.every(option => variant.options.includes(option)));
    match && setSelectedVariant(match);
  }, [itemSize])

  useEffect( () => {
    const options = [color?.id];
    if (color) options.push(itemSize?.id);
    if (otherOption) options.push(otherOption.id);

    const match = product.variants.find(variant => options.every(option => variant.options.includes(option)));
    match && setSelectedVariant(match);
  }, [color])

  useEffect( () => {
    let match = product.variants.find(variant => (itemSize ? variant.options.includes(itemSize.id) : true) && (color ? variant.options.includes(color.id) : true) && (otherOption ? variant.options.includes(otherOption.id) : true));
    match && setSelectedVariant(match);
  }, [otherOption])

    useEffect( () => {
      setSelectedVariant(product.variants.find(e => e.is_Default === true));
  }, [currentId])


  const addToCart = () => {
    setShowSnack(true);
    dispatch(addProduct(
      {
        id: product.id,
        name: product.title,
        thumb: !selectedColor ? product.featuredImageSrc : product.images.filter(e=>e.colorID === selectedColor?.id)[0].src,
        price: selectedVariant.price,
        count: count,
        color: color?.title,
        size: itemSize?.title,
        otherOption: otherOption?.title,
        otherOptionName: otherProductOptions?.name,
        variant_id: selectedVariant.id,
        currency: product.currency
      }
    ))
  }

  return (
    <section className="product-content ">
      <div className="product-content__intro">
        {product.isDiscounted && <span className="product-on-sale">{t('sale')}</span>} 
        <h2 className="product__name">{product.title}</h2>

        <div className="font-normal text-3xl">
          <h4 className={`${product.isDiscounted ? 'text-red-600' : 'text-black'} `}>{(product.currency === "$" ? product.currency : '') + 
          currencyFormatter(selectedVariant.price)+ (product.currency === "€" ? product.currency : '')} </h4>
          <h1 className='text-xs'>{convertKuna(selectedVariant.price) + ' Kn'}</h1>
          
           {product.isDiscounted && <span>{(product.currency === "$" && product.currency) + currencyFormatter(selectedVariant.price)+ product.currency === "€" && product.currency}</span>}
          
        </div>
      </div>
      {/* Pick color of a product */}
      <div className="product-content__filters ">
        <div className="product-filter-item ">
          {productsColors &&  <h5 className='text-black'>{t('color')}</h5>}
            <div className="checkbox-color-wrapper flex-wrap">
              {productsColors?.map((type, index) => {
                return (
                  type.colors !== undefined &&
                  <CheckboxColor
                  selectedColor={selectedColor ? selectedColor : defaultColor}
                    key={type.id}
                    type={'radio'}
                    name="product-color"
                    color={type.colors[0]}
                    valueName={type.label}
                    onChange={() => {
                      setColor(type);
                      setSelectedColor(type);
                    }}
                  />
                )
              }
              )}
         </div>
        </div>

         {/* Pick size of a product */}
        <div className="product-filter-item">
          {productsSizes && productsSizes.length > 0 && <h5 className='text-black'>{t('size')} <strong>{t('see_size_table')}</strong></h5>} 
          {productsSizes && productsSizes.length > 0 && 
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
               <select onChange={(e) => {
                 setItemSize(productsSizes.find(x=> x.id == e.target.value));
               }}
               >
               <option disabled>{t('choose_option')}</option>
               {productsSizes?.map(type => (
                 <option selected={type.id === defaultSize.id} value={type.id}>{type.title}</option>
               ))}
             </select>
            </div>
          </div>
          }
        </div>

        {/* Selector of generic option - like a phone models */}
        <div className="product-filter-item">
          {otherProductOptions && otherProductOptions.values.length > 0 && <h5 className='text-black'>{t('options')} <strong>{otherProductOptions.name}</strong></h5>} 
          {otherProductOptions && otherProductOptions.values.length > 0 && 
          <div className="checkbox-color-wrapper">
            <div className="select-wrapper">
               <select onChange={(e) => {
                let option = otherProductOptions.values.find(x=>x.id == e.target.value);
                 setOtherOption(option);
               }}
               >
               <option disabled>{t('choose_option')}</option>
               {otherProductOptions?.values?.map(type => (
                 <option selected={type.id === defaultOption?.id} value={type.id}>{type.title}</option>
               ))}
             </select>
            </div>
          </div>
          }
        </div>
       
        <div className="product-filter-item">
          <h5 className='text-black'>{t('quantity')}</h5>
          <div className="quantity-buttons">
            <div className="quantity-button">
              <button type="button" onClick={() => setCount(count - 1)} className="quantity-button__btn">
                -
              </button>
              <span>{count}</span>
              <button type="button" onClick={() => setCount(count + 1)} className="quantity-button__btn">
                +
              </button>
            </div>

            <button type="submit" onClick={() => addToCart()} className="btn btn--rounded btn--yellow text-white hover:bg-yellow-400">{t('add_to_cart')}</button>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{vertical:'bottom', horizontal:'right' }}
        open={showSnack}
        autoHideDuration={6000}
        onClose={() => {setShowSnack(false)}}
        message={t('product_added')}
        key={'bottom' + 'right'}
        action={
          <React.Fragment>
            <Link href={'/cart'}>
            <ThemeProvider theme={yellowTheme}>
            <Button  size="small" onClick={() => {}}>
              {t('view_cart')}
            </Button>
            </ThemeProvider>
            </Link>        
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 2 }}
              onClick={() => {setShowSnack(false)}}
            >
              <i class="fa-solid fa-xmark"></i>
            </IconButton>
          </React.Fragment>
        }
      />
    </section>
  );
};

export default Content;
