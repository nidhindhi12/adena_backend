const express = require('express');
const router = express.Router();
const upload = require('../utils/upload')
const { addproduct, readproducts } = require('../controller/productcontroller');


router.post('/addproduct', upload.array('image'), addproduct);
router.get('/readproducts', readproducts);



module.exports = router;