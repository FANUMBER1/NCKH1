const express=require('express');
const router=express.Router();
const controler=require('../../controler/QuanLi1/benhnhan')
router.get('/',controler.benhnhan)
module.exports=router;