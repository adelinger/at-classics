import Layout from '../../layouts/Main';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutStatus from '../../components/checkout-status';
import CheckoutItems from '../../components/checkout/items/checkoutItems';
import { currencyFormatter } from '../../utils/priceFormat';
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Alert, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, LinearProgress, Radio, RadioGroup, Snackbar, ThemeProvider } from '@mui/material';
import { yellowTheme } from '../../utils/assets/yellowTheme';
import { useRouter } from 'next/router';
import { addressJsonObject } from '../../utils/data/addressJsonObject';
import Footer from '../../components/footer/footer';
import { removeAllProducts } from '../../store/actions/cartActions';
import { isMobile } from 'react-device-detect';
import { convertKuna } from '../../utils/constants/convertKuna';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

const CheckoutPage = () => {
  const router = useRouter();
  const {t} = useTranslation('checkout');
  const { cartItems } = useSelector(state => state.cart);
  const currency = cartItems.find(o => true)?.currency;
  const [selectedCountry, setSelectedCountry] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [houseNumber, setHouseNumber] = useState();
  const [postalCode, setPostalCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [shippingData, setShippingData] = useState();
  const [showShippingLoader, setShowShippingLoader] = useState();
  const [shippingError, setShippingError] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [isSelectDisabled, setIsSelectDisabled] = useState(true);
  const [isShippingCalculated, setIsShippingCalculated] = useState();
  const [showSnack, setShowSnack] = useState();
  const [isFormFilled, setIsFormFilled] = useState();
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const [finalPrice, setFinalPrice] = useState();
  const [formValidationPassed, setFormValidationPassed] = useState();
  const [shippingMethod, setShippingMethod] = useState(1);
  const [termsAccepted, setTermsAccepted] = useState();
  const [showTermsError, setShowTermsError] = useState();
  const [isCheckValid, setIsCheckValid] = useState(true);
  const [showPaypalLoader, setShowPaypalLoader] = useState();

  const [{ options }, dispatch] = usePayPalScriptReducer();
  const cartDispatch = useDispatch();

  const priceTotal = useSelector(state => {
    const cartItems = state.cart.cartItems;
    let totalPrice = 0;
    if (cartItems.length > 0) {
      cartItems.map(item => totalPrice += item.price * item.count);
    }
    if (shippingData) {
      totalPrice += selectedShipping === 'standard' ? shippingData.standard : +shippingData.express
    }

    return totalPrice;
  })

  useEffect(() => {
    setShippingMethod(selectedShipping === 'standard' ? 1 : 2)
  }, [selectedShipping]);

  const removeFromCart = () => {
    cartDispatch(removeAllProducts())
  }

  useEffect(() => {
    setFinalPrice(priceTotal);

    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency === '€' ? 'EUR' : 'USD',
        locale: 'en_GB',
        "disable-funding":'credit,card,applepay',
        
      },
    });
  }, [priceTotal]);

  const isFormValid = () => {
    var inputs = document.querySelectorAll('.input-container input');

    for (const input of inputs)
      if (input.value === '') return false;

    return true;
  }

  const formCheck = () => {
    if (isFormValid()) {
      setIsSelectDisabled(false);
      setIsFormFilled(true);
    } else {
      setIsSelectDisabled(true);
      setIsFormFilled(false);
    }
  }


  const getLineItems = () => {
    let lineItems = [];
    cartItems.map((item) => {
      lineItems.push({
        "product_id": item.id,
        "variant_id": item.variant_id,
        "quantity": item.count,
        "title": item.name,
        "price": currencyFormatter(item.price) + currency
      });
    });

    return lineItems;
  }

  const onSelectCountryChange = (e) => {
    if (e.target.value === 'EMPTY') {
      setIsShippingCalculated(false);
      return;
    }

    if (!isFormValid()) {
      return;
    }

    setShowShippingLoader(true);
    setSelectedCountry(e.target.value);

    let lineItems = getLineItems();

    var jsonData = addressJsonObject(lineItems, firstName, lastName, email, phoneNumber, e.target.value, address, houseNumber, city, postalCode);

    fetch('/api/shipping', {
      method: 'POST',
      body: JSON.stringify(jsonData),
    }).then((res) => {
      setShowShippingLoader(false);
      if (res.status === 200) {
        setIsShippingCalculated(true);
        setShippingError(false);
        return res.json();
      } else {
        setIsShippingCalculated(false);
        setShippingError(true);
        setShowShippingLoader(false);
      }

    })
      .then((data) => {
        if (data) {
          setShippingData(data);
        } else {
          setIsShippingCalculated(false);
          setShippingError(true);
        }

      })

  }



  return (
    <Layout>
      <section className="cart">
        <form className='form' id='dataForm' method='POST'>
          <div className="container">
            <div className="cart__intro">
              <h3 className="cart__title">{t('shipping_and_payment')}</h3>
              <CheckoutStatus step="checkout" />
            </div>
            {
              isPaymentFailed &&
              <div className='flex'>
                <Alert className='-mt-10 mb-5 w-full' variant="filled" severity="error">
                  {t('payment_error')}
                </Alert>

              </div>

            }

            <div className="checkout-content">
              <div className="checkout__col-6">
                {/* <div className="checkout__btns">
                <button className="btn btn--rounded btn--yellow">Log in</button>
                <button className="btn btn--rounded btn--border">Sign up</button>
              </div> */}


                <div className="block">
                  <h3 className="block__title">{t('shipping_information')}</h3>

                  <div className='input-container'>
                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setFirstName(e.target.value); formCheck(); }} required type="text" placeholder={t('first_name')} />
                      </div>
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setLastName(e.target.value); formCheck(); }} required type="text" placeholder={t('last_name')} />
                      </div>
                    </div>
                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setEmail(e.target.value); formCheck(); }} required type="email" placeholder={t('email')} />
                      </div>
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setPhoneNumber(e.target.value); formCheck(); }} required type="tel" placeholder={t('phone_number')} />
                      </div>
                    </div>
                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setAddress(e.target.value); formCheck(); }} required type="text" placeholder={t('address')} />
                      </div>
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setHouseNumber(e.target.value); formCheck(); }} required type="text" placeholder={t('house_number')} />
                      </div>
                    </div>
                    <div className="form__input-row form__input-row--two">
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setPostalCode(e.target.value); formCheck(); }} required type="number" placeholder={t('postal_code')} />
                      </div>
                      <div className="form__col">
                        <input className="form__input form__input--sm" onChange={(e) => { setCity(e.target.value); formCheck(); }} required type="text" placeholder={t('city')} />
                      </div>
                    </div>
                  </div>
                  <div className="form__input-row form__input-row--one">
                    <div className="form__col">
                      <div className="select-wrapper select-form h-12">
                        <select disabled={isSelectDisabled} onChange={onSelectCountryChange}>
                          <option>{t('country')}</option>
                          <option value="EMPTY">Select country</option>
                          <option value="AT">Austria</option>
                          <option value="BE">Belgium</option>
                          <option value="BG">Bulgaria</option>
                          <option value="HR">Croatia</option>
                          <option value="CY">Cyprus</option>
                          <option value="CZ">Czech Republic</option>
                          <option value="DK">Denmark</option>
                          <option value="EE">Estonia</option>
                          <option value="FI">Finland</option>
                          <option value="FR">France</option>
                          <option value="DE">Germany</option>
                          <option value="GR">Greece</option>
                          <option value="HU">Hungary</option>
                          <option value="IE">Ireland</option>
                          <option value="IT">Italy</option>
                          <option value="LV">Latvia</option>
                          <option value="LT">Lithuania</option>
                          <option value="LU">Luxembourg</option>
                          <option value="MT">Malta</option>
                          <option value="NL">Netherlands</option>
                          <option value="PL">Poland</option>
                          <option value="PT">Portugal</option>
                          <option value="RO">Romania</option>
                          <option value="SK">Slovakia</option>
                          <option value="SI">Slovenia</option>
                          <option value="ES">Spain</option>
                          <option value="SE">Sweden</option>
                        </select>
                      </div>
                    </div>
                    {
                        showShippingLoader && isMobile &&
                        <ThemeProvider theme={yellowTheme}>
                          <p className='text-center mt-2 mb-2'>{t('calculating_shipping')}</p>
                           <LinearProgress></LinearProgress>
                        </ThemeProvider>
                    }
                  
                  </div>

                  <FormGroup>
                    <FormControlLabel className='mt-5' control={<Checkbox formValidationPassed id='termsCheckbox'
                      onChange={(e) => { setTermsAccepted(e.target.checked); e.target.checked && setShowTermsError(false); }} />}
                      label={
                        <div className='cursor-auto'>
                          <span>{t('i_agree')} </span>
                          <Link className='underline' href={'/'}>{t('toc')}</Link>
                          <span> {t('and')} </span>
                          <Link className='underline' href={'/personal-data'}>{t('privacy_policy')} </Link>
                          <span>{t('of_this_webshop')}</span>
                        </div>
                      }
                    />
                    {
                      showTermsError &&
                      <FormHelperText className='text-red-500 ml-8'>{t('toc_not_accepted')}</FormHelperText>
                    }

                  </FormGroup>

                </div>
              </div>

              <div className="checkout__col-2">
                <div className="block">
                  <h3 className="block__title">{t('your_cart')}</h3>
                  <CheckoutItems />
                  <ul className="checkout-items">

                    <li className="checkout-item">
                      <div className="checkout-item__content">
                        <i class="ml-4 fa-solid fa-truck-fast"></i>
                        <div className="checkout-item__img">

                        </div>
                        <div className="checkout-item__data">
                          <p className='-ml-8 text-black'>{t('shipping')}</p>
                        </div>
                      </div>
                      <div className='flex-col mr-3'>
                      <h3 className='text-black '>{shippingData && currencyFormatter(selectedShipping === 'standard' ? shippingData.standard :
                        shippingData.express) + currency}
                        </h3>
                        <div>
                       
                        <h1 className='text-xs'>{shippingData && convertKuna(selectedShipping === 'standard' ? shippingData.standard : shippingData.express) + ' Kn'}</h1>
                        </div>
                        </div>
                       
                    </li>
                    {shippingData &&
                      <li className='checkout-item -mt-5'>
                        <div className="checkout-item__content ml-10">
                          <FormControl >
                            <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                            <RadioGroup row={true}
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue="standard"
                              name="radio-buttons-group"
                              onChange={(e) => setSelectedShipping(e.target.value)}
                            >
                              <FormControlLabel value="standard" control={<Radio />} label="Standard" />
                              <FormControlLabel disabled={shippingData.express ? false : true} value="ekspress" control={<Radio />} label="Express" />
                            </RadioGroup>
                          </FormControl>
                        </div>
                      </li>
                    }

                    {
                      showShippingLoader &&
                      <ThemeProvider theme={yellowTheme}>
                        <p className='text-center mb-2'>{t('calculating_shipping')}</p>
                        <LinearProgress></LinearProgress>
                      </ThemeProvider>
                    }

                    {
                      shippingError &&
                      <Alert className='mt-1' severity='error'>{t('error_calculating_shipping')}</Alert>
                    }

                  </ul>

                  <div className="checkout-total">
                    <p>{t('total_cost')}</p>
                    <div className='flex-col'>
                    <h3 className='text-black'>{currencyFormatter(priceTotal) + currency} </h3>
                    <h1 className='text-xs'>{convertKuna(priceTotal) + ' Kn'}</h1>
                    </div>
                  </div>
                </div>
              </div>

              <div className="checkout__col-4">
                <div className="block">
                  <h3 className="block__title">Payment method</h3>
                  <PayPalButtons onClick={async (e) => {
                    var form = document.getElementById("dataForm")
                    let isFormValid = form.reportValidity();
                    !document.getElementById('termsCheckbox').checked ? setShowTermsError(true) : setShowTermsError(false);
                    if (!document.getElementById('termsCheckbox').checked || !isFormValid || !isFormFilled || !isShippingCalculated) { return false; }
                    isFormValid ? setFormValidationPassed(true) : setFormValidationPassed(false)

                    //make backend check to see if data is correct
                    try {
                      const lineItems = getLineItems();
                      let shippingCost = selectedShipping === 'standard' ? shippingData.standard : shippingData.express;
                      var jsonData = addressJsonObject(lineItems, firstName, lastName, email, phoneNumber, selectedCountry,
                        address, houseNumber, city, postalCode, null, shippingMethod, currencyFormatter(shippingCost) + currency, true, currencyFormatter(priceTotal) + currency);

                      const res = await fetch('/api/validate-order', {
                        method: 'POST',
                        body: JSON.stringify(jsonData),
                      });
                      if (!res.ok) {
                        setIsCheckValid(false);
                        return false;
                      }
                      const data = await res.json();
                      if (data.success) {
                        setIsCheckValid(true);
                        setIsPaymentFailed(false);
                      } else {
                        setIsCheckValid(false);
                        setIsPaymentFailed(true);
                        setShowPaypalLoader(false);
                        return false;
                      }

                    } catch (err) {
                      setIsCheckValid(false);
                      setIsPaymentFailed(true);
                      setShowPaypalLoader(false);
                      return false;
                    }

                  }}

                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: currencyFormatter(finalPrice)
                            },
                          },
                        ],
                        application_context: {
                          shipping_preference: 'NO_SHIPPING',
                        },

                      })

                    }}

                    onApprove={(data, actions) => {
                      setShowPaypalLoader(true);
                      return actions.order.capture().then((details) => {
                        const status = details.status
                        if (status === 'COMPLETED') {
                          setIsPaymentFailed(false);
                          //router.replace('/cart/checkout-completed')
                          const lineItems = getLineItems();
                          let shippingCost = selectedShipping === 'standard' ? shippingData.standard : shippingData.express
                          var jsonData = addressJsonObject(lineItems, firstName, lastName, email, phoneNumber, selectedCountry,
                            address, houseNumber, city, postalCode, null, shippingMethod, currencyFormatter(shippingCost) + currency, true, currencyFormatter(priceTotal) + currency);

                          //add order to the database, send confirmation email
                          fetch('/api/order', {
                            method: 'POST',
                            body: JSON.stringify(jsonData),
                          }).then((res) => {
                            if (res.status === 200) {
                              return res.json();
                            } else {
                              setIsPaymentFailed(true);
                            }
                          })
                            .then((data) => {
                              //GO TO CONFIRMATION PAGE
                              setShowPaypalLoader(false);
                              if (data.success) {
                                removeFromCart();
                                router.push({
                                  pathname: 'checkout-completed',
                                  query: { orderId: data.id }
                                }, 'checkout-completed?orderId=' + data.id);
                              } else {
                                setIsPaymentFailed(true)
                              }

                              //router.replace('/cart/checkout-completed')
                            })

                        } else {
                          setIsPaymentFailed(true);
                        }


                      });
                    }}
                    disabled={!isShippingCalculated || !termsAccepted || !isFormFilled ? true : false}></PayPalButtons>
                  {showPaypalLoader &&
                    <ThemeProvider theme={yellowTheme}>
                      <LinearProgress></LinearProgress>
                    </ThemeProvider>
                  }

                </div>
              </div>


            </div>

            <div className="cart-actions cart-actions--checkout">
              <Link href="/cart" className="cart__btn-back md:mt-0 mt-10"><i className="icon-left"></i> {t('back')}</Link>
              <div>
                <Link href={'/'} type="button" className="btn-gray-rounded">{t('continue_shopping')}</Link>
              </div>
            </div>
          </div>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={showSnack}
          autoHideDuration={3000}
          onClose={() => { setShowSnack(false) }}
          message="Enter your address first."
          key={'bottom' + 'right'}
        />
      </section>
      <Footer></Footer>
    </Layout>
  )
};


export default CheckoutPage

export const getServerSideProps = async ({locale}) => {

  return {
    props: {
      ...await serverSideTranslations(locale ?? 'en', ['header', 'checkout', 'footer']),
    }
  };
}