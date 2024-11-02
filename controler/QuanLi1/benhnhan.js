const express=require('express');
const app = express();
app.set('view engine', 'ejs');

module.exports={
     benhnhan:async(req,res)=>{
        res.render('pages/benhnhan')
     }
}