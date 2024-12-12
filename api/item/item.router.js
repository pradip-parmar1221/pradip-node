const express = require('express');
const router = express.Router();
const {
   
    additem,
    getitem,
    deleteitem,
    updateitem,
    uploadaudio,
}=require('./item.controller')

router.post('/additem', additem);
router.post('/getitem', getitem);
router.post('/deleteitem', deleteitem);
router.post('/updateitem', updateitem);
router.post('/uploadaudio', uploadaudio);
module.exports=router