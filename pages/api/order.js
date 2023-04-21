import { server } from "../../utils/server";

export default function handler(req, res) {
  const dev = process.env.NODE_ENV !== 'production';
        const https = require("https");
        const agent = new https.Agent({
            rejectUnauthorized: dev ? false : true
          })
          const base64 = require('base-64');
          const login = base64.encode(process.env.API_USERNAME+":"+process.env.API_PASSWORD);

        fetch(server+ '/products/new-order', {
          headers: {
                 'Content-Type': 'application/json;',
                 'Authorization': `Basic ${
                  login
                }`
          },
          method: 'POST',
          body: req.body,
          agent: agent
        })
        .then(response => response.status === 200 && response.json())
        .then(json => json ? res.status(200).send(json) : res.status(500).send())

} 