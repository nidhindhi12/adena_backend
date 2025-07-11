const express = require('express');
const router = express.Router();
const { addcategory, readcategory, getcategorywithproductcount, deletecategory, updatecategory } = require('../controller/categorycontroller');

router.post('/addcategory', addcategory);
router.get('/readcategorydata', readcategory);
router.get('/categorieswithcount', getcategorywithproductcount)
router.put('/updatecategory/:id',updatecategory)
router.delete('/deletecategory/:id',deletecategory)

module.exports = router;