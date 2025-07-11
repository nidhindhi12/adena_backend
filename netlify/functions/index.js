const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http')
const connection = require('./utils/connectdb')
const userroutes = require('./routes/userroutes')
const productroutes = require('./routes/productroutes')
const categoryroutes = require('./routes/categoryroutes')
const genderroutes = require('./routes/genderroutes')
const metalroutes = require('./routes/metalroutes')
const ocassionroutes = require('./routes/ocassionroutes')
const orderroutes = require('./routes/orderroutes');
const wishlistroutes = require('./routes/wishlistroutes');
const router = express.Router();

const app = express();
app.use(express.json());
app.use(cors());

connection();

router.get('/ping', (req, res) => {
    res.json({ message: 'pong ✅ from  Netlify serverless Express' })
});
router.use('/api', userroutes);
router.use('/product', productroutes);
router.use('/category', categoryroutes)
router.use('/gender', genderroutes);
router.use('/metal', metalroutes);
router.use('/ocassion', ocassionroutes)
router.use('/wishlist', wishlistroutes);
router.use('/order', orderroutes);
app.use('./netlify/function/index', router)



module.exports.handler = serverless(app);



