const express = require('express');
const router = express.Router();
const { addmetal, readmetaldata, deletemetal, getmetalwithproductcount, updatemetal } = require('../controller/metalcontroller');


router.post('/addmetal', addmetal);
router.get('/readmetaldata',readmetaldata);
router.delete('/deletemetal/:id',deletemetal);
router.get('/getmetalwithproductcount',getmetalwithproductcount);
router.put('/updatemetal/:id',updatemetal);

module.exports = router;