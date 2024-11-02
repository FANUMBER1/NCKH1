const express=require('express');
const app = express();
app.set('view engine', 'ejs');

module.exports={
     hoso:async(req,res)=>{
        res.render('pages/hoSo')
     }
}