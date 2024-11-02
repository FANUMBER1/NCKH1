const express=require('express');
const router=express.Router();
const controler=require('../../controler/QuanLi1/phongBenh')
router.get('/',controler.phongbenh)
module.exports=router;