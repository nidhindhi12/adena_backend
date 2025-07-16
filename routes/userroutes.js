const express = require('express');
const router = express.Router();
const { adduser, loginuser, AuthVerify, readalluser, updateuser, verifyemail, resetpasswordlink, resetpassword } = require('../controller/usercontroller')
const upload = require('../utils/userupload')
const Auth = require('../middleware/authverify')




router.post('/', adduser);
router.post('/loginuser', loginuser)
router.post('/authverify', Auth, AuthVerify)
router.get('/readalluser', readalluser)
router.put('/updateuser/:id',updateuser)
router.get('/verify-email/:token',verifyemail)
router.post('/reset-password-link/:userId', resetpasswordlink);
router.post('/reset-password/:userId/:token', resetpassword);    
module.exports = router;
    
