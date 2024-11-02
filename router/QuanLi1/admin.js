const express=require('express');
const router=express.Router();
const hoso=require('./HoSo')
const phongbenh=require('./phongBenh')
const trangtong=require('./trangTong')
const benhnhan=require('./benhnhan')

/////Trang Tổng
router.use('/',trangtong)
/////Trang Hồ Sơ
router.use('/hoSo',hoso)
////Giám sát phòng bệnh
router.use('/phongbenh',phongbenh)
////Thông Tin bệnh nhân
router.use('/benhnhan',benhnhan)
module.exports=router;