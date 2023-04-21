import React, { Fragment, useState } from 'react';
import Router from 'next/router';
import {wrapper} from '../store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { appWithTranslation } from 'next-i18next'


// global styles
import 'swiper/scss'
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";
import NextNProgress from 'nextjs-progressbar';
import * as gtag from './../utils/gtag';

const isProduction = process.env.NODE_ENV === 'production';
const paypalToken = isProduction ? process.env.PAYPAL_LIVE_TOKEN : process.env.PAYPAL_DEMO_TOKEN

// only events on production
if(isProduction) {
  
  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url) => gtag.pageview(url));
}


const MyApp = ({Component, pageProps}) => (
  <PayPalScriptProvider options= {{"client-id": paypalToken}}>
   <Fragment>
   <NextNProgress color='#ffd600'/>
    <Component {...pageProps} />
  </Fragment>
  </PayPalScriptProvider>
 
);

export default appWithTranslation(wrapper.withRedux(MyApp));