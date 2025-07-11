const express = require('express');
const router = express.Router();
const { addorder } = require('../controller/ordercontroller');


router.post('/addorder/:id', addorder);

module.exports = router