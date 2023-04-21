import { getFetchUrl } from './data/getFetchUrl';
import { server } from './server';

const base64 = require('base-64');
const login = base64.encode(process.env.API_USERNAME+":"+process.env.API_PASSWORD);
const dev = process.env.NODE_ENV !== 'production';

const https = require("https");
const agent = new https.Agent({
    rejectUnauthorized: dev ? false : true
  });

export async function getProducts(params, languageCulture) {
  const url = getFetchUrl(params, languageCulture);
  const res = await fetch(url, {
     method: "GET",
     headers: {
      'Authorization': `Basic ${
       login
     }`
    },
    agent: agent
});
    const data = await res.json();
    return data
  }

  export async function getLatestProducts(languageCulture) {
    const res = await fetch(`${server}/products/?sortOrder=createdDesc&limit=12&languageCulture=`+languageCulture, {
       method: "GET",
       headers: {
        'Authorization': `Basic ${
         login
       }`
      },
      agent: agent
  });
      const data = await res.json();
      return data
    }

    export async function getRelatedProducts(productId, languageCulture) {
      const res = await fetch(`${server}/products/related-products?productId=${productId}&languageCulture=${languageCulture}`, {
         method: "GET",
         headers: {
          'Authorization': `Basic ${
           login
         }`
        },
        agent: agent
    });
        const data = await res.json();
        return data
      }

    export async function getFeaturedProducts(languageCulture) {
      const res = await fetch(`${server}/products/featured-products?languageCulture=${languageCulture}`, {
         method: "GET",
         headers: {
          'Authorization': `Basic ${
           login
         }`
        },
        agent: agent
    });
        const data = await res.json();
        return data
      }
  

  export async function getSingleProduct(pid, languageCulture) {
    const res = await fetch(`${server}/products/${pid}?languageCulture=${languageCulture}`, {
     method: "GET",
     headers: {
      'Authorization': `Basic ${
       login
     }`
    },
    agent: agent
});

    const product = await res.json();

    return product;

}


