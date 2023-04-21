import Layout from '../layouts/Main';
import Footer from '../components/footer/footer';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const PaymentOptions = () => {
    const {t} = useTranslation('payment-options');

    return (
        <Layout>
            <section>
                <div className="pl-5 pr-5 md:pl-72 md:pr-72 text-justify page-size">
                    {/* <h1 className='text-center text-black mt-5 text-2xl'>Payment options</h1>

                    <p className='mt-10'>At our webshop, we offer a variety of payment options to make your shopping experience as convenient as possible.</p>

                    <h2 className='text-black text-l font-bold mt-10'>Major card providers</h2>
                    <p>

                        We accept all major credit cards, including Visa, Mastercard and American Express. You can also choose to pay with Paypal.</p>
                    <h2 className='mt-10 text-black text-l font-bold'>Paypal</h2>
                    <p>
                        All of our payments are processed securely through Paypal to ensure the protection of your personal and financial information.</p>
                    <p>Thank you for choosing our webshop. We are committed to providing you with a seamless and enjoyable shopping experience.</p>
                    <div className="w-5/12 ml-auto mr-auto mt-10">
                        <div>
                            <ul className="round-options round-options--two">
                                <li className="round-item">
                                    <img src="/images/logos/paypal.png" alt="Paypal" />
                                </li>
                                <li className="round-item">
                                    <img src="/images/logos/visa.png" alt="Paypal" />
                                </li>
                                <li className="round-item">
                                    <img src="/images/logos/mastercard.png" alt="Paypal" />
                                </li>
                                <li className="round-item">
                                    <img src="/images/logos/maestro.png" alt="Paypal" />
                                </li>

                            </ul>
                        </div>
                    </div> */}

                    <h1 className='text-center text-black mt-5 text-2xl'>{t('payment_options')}</h1>

                    <p className='mt-10'>{t('text_1')}</p>
                    <h2 className='mt-10 text-black text-l font-bold'>Paypal</h2>
                    <p>
                        {t('text_2')}</p>
                    <p>{t('text_3')}</p>
                    <div className=" ml-auto mr-auto mt-10">
                        <div>
                            <ul className="round-options round-options--three">
                                <li className="round-item">
                                    <img src="/images/logos/paypal.png" alt="Paypal" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </Layout>
    )
}


export default PaymentOptions

export async function getStaticProps({ locale }) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'return', 'footer', 'header', 'payment-options',
        ])),
      },
    }
  }