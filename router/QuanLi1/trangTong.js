const express=require('express');
const router=express.Router();
const controler=require('../../controler/QuanLi1/trangTong')
router.get('/',controler.trangtong)
module.exports=router;