const express = require('express');
const app = express();
const path = require('path');
const body=require('body-parser')
const port = 2222;
const quanli1=require('./router/QuanLi1/admin')
app.set('view engine', 'ejs');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use('/',quanli1)
app.listen(port,()=> {
    console.log(`Server is running on http://localhost:${port}`);
});
   


