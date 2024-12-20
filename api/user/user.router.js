const express = require('express');
const router = express.Router();
const {
    signin,
    signup,
    getcurrency,
    updatecurrency,
    updateuser,
}=require('./user.controller')
router.post('/signin', signin);
router.post('/signup', signup);
router.post('/getcurrency', getcurrency);
router.post('/updatecurrency', updatecurrency);
router.post('/updateuser', updateuser);
module.exports=router