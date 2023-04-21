import { useSelector } from 'react-redux';
import { convertKuna } from '../../../utils/constants/convertKuna';
import { currencyFormatter } from '../../../utils/priceFormat';

const CheckoutItems = () => {
  const { cartItems } = useSelector(state => state.cart);

  return (
      <ul className="checkout-items">
        {cartItems.map(item => (
          <li className="checkout-item">
            <div className="checkout-item__content">
              <div className="checkout-item__img">
                <img src={item.thumb} />
              </div>

              <div className="checkout-item__data">
                <h3 className='text-black'>{item.name} ({item.count})</h3>
              </div>
            </div>
            <div className='flex-col'>
            <h3 className='text-black'>{currencyFormatter(item.price) + item.currency}</h3>
            <h1 className='text-sm'>{convertKuna(item.price) + ' kn'}</h1>
            </div>
          </li>
        ))}
      </ul>
  )
};

  
export default CheckoutItems