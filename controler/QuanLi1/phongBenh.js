const express=require('express');
const app = express();
app.set('view engine', 'ejs');

module.exports={
     phongbenh:async(req,res)=>{
        res.render('pages/phongbenh')
     }
}