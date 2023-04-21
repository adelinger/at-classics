import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { removeProduct } from '../../../store/actions/cartActions';
import { setCount } from '../../../store/actions/cartActions';
import { convertKuna } from '../../../utils/constants/convertKuna';

const ShoppingCart = ({ thumb, name, id, color, size, count, price, currency, otherOption }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(removeProduct(
      { 
        id: id,
        color: color,
        size: size
      }
    ))
  }

  const setProductCount = (count) => {
    if(count <= 0) {
      return false;
    }

    dispatch(setCount(
      { 
        id: id,
        color: color,
        size: size,
        count: count,
      }
    ))
  }

  return (
    <tr>
      <td>
        <div className="cart-product">
          <div className="cart-product__img">
            <Link  href={'/product/'+id}>
            <img src={thumb} alt="" />
            </Link>
          </div>

          <div className="cart-product__content">
          <Link  href={'/product/'+id}>
            <h3 className='text-black'>{name}</h3>
            </Link>
          </div>
        </div>
      </td>
      <td className="cart-item-before" data-label="Color">{color}</td>
      <td className="cart-item-before" data-label="Size">{size}</td>
      <td className="cart-item-before" data-label="Other options">{otherOption ? otherOption : '-'}</td>
      <td className='cart-item-before' data-label='Amount'>
        <div className="quantity-button">
          <button type="button" onClick={() => setProductCount(count - 1)} className="quantity-button__btn">
            -
          </button>
          <span>{ count }</span>
          <button type="button" onClick={() => setProductCount(count + 1)} className="quantity-button__btn">
            +
          </button>
        </div>
      </td>
      <td className='cart-item-before' data-label='Price'>{price + currency}<h1 className='text-xs'>{convertKuna(price) + 'Kn'}</h1></td>
      <td></td>
      <td className="cart-item-cancel"><i className="icon-cancel" onClick={() => removeFromCart()}></i></td>
      
    </tr>
  )
};

  
export default ShoppingCart