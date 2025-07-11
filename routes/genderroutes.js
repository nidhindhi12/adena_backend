const express = require('express');
const { addgender, readgenderdata } = require('../controller/gendercontroller');
const router = express.Router();


router.post('/addgender', addgender);
router.get('/readgenderdata',readgenderdata);

module.exports = router;