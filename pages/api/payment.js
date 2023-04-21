export default function handler(req, res) {
    if (req.method === 'POST') {
        // Process a POST request

         fetch('https://test-wallet.corvuspay.com/checkout/', {
          method: "POST",
          headers: {
             
           }}).then(response => response.json())
           .then(json => res.status(200).send(json))
      }
      } 