const express=require('express');
const router=express.Router();
const controler=require('../../controler/QuanLi1/HoSo')
router.get('/',controler.hoso)
module.exports=router;