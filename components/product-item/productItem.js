import Link from 'next/link';
import { some } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/actions/cartActions';
import { currencyFormatter } from '../../utils/priceFormat';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button, IconButton, Snackbar, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { yellowTheme } from '../../utils/assets/yellowTheme';
import { convertKuna, kunaExchangeRate } from '../../utils/constants/convertKuna';
import { useTranslation } from 'next-i18next';

const ProductItem = ({ discount, productImage, id, name, price, currentPrice, quickCart, currency, placeHolder, variant_id }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showSnack, setShowSnack] = useState();
  const priceInKuna = convertKuna(currentPrice)
  const {t} = useTranslation('products');

  const onBlur = (e) => {
    let target = e.target.classList;
    target.add('transform');
    target.add('duration-500');
    target.remove('image-thumb')

    return target;
}

  const addToCart = () => {
    setShowSnack(true);
    dispatch(addProduct(
      {
        id: id,
        name: name,
        thumb: productImage,
        price: price,
        count: 1,
        currency: currency,
        variant_id: variant_id
      }
    ))
  }

  return (
    <div className="product-item">
      <div className='w-full rounded md:hover:opacity-50 md:cursor-pointer'>
        <Link href={`/product/${id}`}>
          <Image
            {...placeHolder}
            width={260}
            height={285}
            loading="lazy"
            onLoad={(e)=> { onBlur(e)}}
            className="image-thumb md:-mt-8"
            placeholder='blur'
            src={productImage}
            loader={() => productImage}
            alt={name + ' Image'} />
          {discount &&
            <span className="font-medium text-xs py-1 px-2 relative text-white z-10">{discount}%</span>
          }
        </Link>
      </div>

      <div className="font-light text-base mb-2">
        <h3 className='text-black text-center'>{name}</h3>
        <div className={"font-normal text-xl min-h-max" + (discount ? 'font-normal text-xl text-red-500' : '')} >
          <h4 className='text-center'>{(currency === "$" ? currency : '') + currencyFormatter(currentPrice ? currentPrice : '') +
           (currency == "€" ? currency : '')}  </h4>
           <h1 className='text-xs text-center'>{priceInKuna + ' Kn'}</h1>
          {discount &&
            <span className='text-center'>{currencyFormatter(price) + currency}</span>
          }

        </div>
        <button type="button" onClick={() => { quickCart ? addToCart() : router.push(`/product/${id}`) }} className='btn-yellow-rounded text-center'>
            <i class="fa-solid fa-cart-shopping"></i>
          </button>
      </div>
      <Snackbar
        anchorOrigin={{vertical:'bottom', horizontal:'right' }}
        open={showSnack}
        autoHideDuration={3000}
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
    </div>
  )
};


export default ProductItem