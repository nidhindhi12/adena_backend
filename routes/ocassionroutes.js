const express = require('express');
const router = express.Router();
const { addocasssion, readocassiondata, deleteocassion, getocassionwithproductcount, updateocassion } = require('../controller/ocassioncontroller');


router.post('/addocassion', addocasssion);
router.get('/readocassiondata',readocassiondata)
router.delete('/deleteocassion/:id',deleteocassion);
router.get('/getocassionwithproductcount',getocassionwithproductcount);
router.put('/updateocassion/:id',updateocassion);

module.exports = router;