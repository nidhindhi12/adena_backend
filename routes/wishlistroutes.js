const express = require('express');
const router = express.Router();
const { addwishlist, removewishlist, getwishlist } = require('../controller/wishlistcontroller')
const wishlistverify = require('../middleware/wishlistverify')

router.post('/addwishlist', wishlistverify, addwishlist);
router.delete('/removewishlist/:productId', wishlistverify, removewishlist);
router.get('/getwishlist', wishlistverify, getwishlist);

module.exports = router