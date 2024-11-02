const express=require('express');
const app = express();
app.set('view engine', 'ejs');

module.exports={
     trangtong:async(req,res)=>{
        res.render('pages/index')
     }
}