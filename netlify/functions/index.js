const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http')
const connection = require('../../utils/connectdb')
const userroutes = require('../../routes/userroutes')
const productroutes = require('../../routes/productroutes')
const categoryroutes = require('../../routes/categoryroutes')
const genderroutes = require('../../routes/genderroutes')
const metalroutes = require('../../routes/metalroutes')
const ocassionroutes = require('../../routes/ocassionroutes')
const orderroutes = require('../../routes/orderroutes');
const wishlistroutes = require('../../routes/wishlistroutes');
const router = express.Router();


const app = express();
app.use(cors())
// app.use(cors({
//   origin: 'https://phenomenal-elf-ef84a9.netlify.app/',
//   credentials: true 
// }));


app.use(express.json());

app.use((req, res, next) => {
    if (
        req.headers['content-type'] &&
        req.headers['content-type'].includes('application/json')
    ) {
        let raw = '';
        req.on('data', chunk => (raw += chunk));
        req.on('end', () => {
            try {
                req.body = JSON.parse(raw);
                console.log('✅ Parsed body:', req.body);
            } catch (e) {
                console.log('❌ JSON parse error:', e.message);
                req.body = {};
            }
            next();
        });
    } else {
        next();
    }
});


connection();

router.get('/ping', (req, res) => {
    res.json({ message: 'pong ✅ from  Netlify serverless Express' })
});
router.use('/user', userroutes);
router.use('/product', productroutes);
router.use('/category', categoryroutes)
router.use('/gender', genderroutes);
router.use('/metal', metalroutes);
router.use('/ocassion', ocassionroutes)
router.use('/wishlist', wishlistroutes);
router.use('/order', orderroutes);
app.use('/.netlify/functions/index', router)



module.exports.handler = serverless(app);



