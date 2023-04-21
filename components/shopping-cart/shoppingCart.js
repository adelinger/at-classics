import Link from 'next/link';
import { useSelector } from 'react-redux';
import { currencyFormatter, formatter } from '../../utils/priceFormat';
import CheckoutStatus from '../checkout-status';
import Footer from '../footer/footer';
import Item from './item/shopingCartItem';
import Layout from '../../layouts/Main';
import { useTranslation } from 'next-i18next';

const ShoppingCart = () => {
  const {t} = useTranslation('checkout')
  const { cartItems } = useSelector(state => state.cart);
  const currency = cartItems.find(o => true)?.currency;


  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if(cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }

    return totalPrice;
  })


  return (
    <Layout>
    <section className="cart !p-0 md:!mb-32">
      <div className="container">
        <div className="cart__intro">
          <h3 className="cart__title">{t('shopping_cart')}</h3>
          <CheckoutStatus step="cart" />
        </div>

        <div className="cart-list">
          {cartItems.length > 0 &&
            <table>
              <tbody>
                <tr>
                  <th style={{textAlign: 'left'}}>{t('cart_product')}</th>
                  <th>{t('color')}</th>
                  <th>{t('size')}</th>
                  <th>{t('other_options')}</th>
                  <th>{t('amount')}</th>
                  <th>{t('price')}</th>
                  <th className='invisible'>Remove</th>
                </tr>

                {cartItems.map(item => (
                  <Item 
                    key={item.id}
                    id={item.id}
                    thumb={item.thumb}
                    name={item.name}
                    color={!item.color ? '-' : item.color}
                    price={currencyFormatter(item.price * item.count)}
                    size={!item.size ? '-' : item.size}
                    count={item.count}
                    currency={item.currency}
                    otherOption={item.otherOption}
                    otherOptionName={item.otherOptionName}
                  />
                ))}
              </tbody>
            </table> 
          } 
          
          {cartItems.length === 0 && 
            <p>{t('no_products_in_cart')}</p>
          }
        </div>
      
        <div className="cart-actions">
          <a href="/products" className="cart__btn-back"><i className="icon-left"></i> {t('continue_shopping')}</a>
          {/* <input type="text" placeholder="Promo Code" className="cart__promo-code" /> */}

          <div className="cart-actions__items-wrapper">
            <p className="cart-actions__total">{t('total_cost')}<strong>{priceTotal !== 0 && currencyFormatter(priceTotal) + currency}</strong></p>
            <div className={priceTotal === 0 && 'cursor-not-allowed'}>
              <Link href="/cart/checkout" className={`${priceTotal === 0 ? 'btn-gray-rounded' :  'btn-yellow-rounded'} ${priceTotal === 0 && 'pointer-events-none'}`}>{t('checkout')}</Link>
              </div>
          </div>
        </div>
      </div>
    </section>
    <Footer></Footer>
    </Layout>
  )
};

  
export default ShoppingCart