const express = require('express');
const router = express.Router();
const {
   
    additem,
    getitem,
    deleteitem,
    updateitem,
    invoice_img_upload,
}=require('./item.controller')

router.post('/additem', additem);
router.post('/getitem', getitem);
router.post('/deleteitem', deleteitem);
router.post('/updateitem', updateitem);
router.post('/invoice_img_upload', invoice_img_upload);
module.exports=router