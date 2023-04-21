import { getFetchUrl } from "../../utils/data/getFetchUrl";
import { server } from "../../utils/server"


export default  (req, res) => {
   const dev = process.env.NODE_ENV !== 'production';
   const https = require("https");
   const url = req.query.type === 'featured' ? server + '/products/featured-products' : getFetchUrl(req.query);

   
}
