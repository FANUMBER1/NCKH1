const express=require('express');
const router=express.Router();
const hoso=require('./HoSo')
const phongbenh=require('./phongBenh')
const trangtong=require('./trangTong')

router.use('/',trangtong)

module.exports=router;