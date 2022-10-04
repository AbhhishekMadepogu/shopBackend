const express=require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');

const app=express()
require('dotenv/config');
const api=process.env.API_URL

//middleware
app.use(express.json())
app.use(morgan('tiny'))

app.get(`${api}/products`,(req,res)=>{
    const product={
        id:1,
        name:'hair dresser',
        image:'someurl',
    }
    res.send(product);
})
console.log(process.env.CONNECTION_STRING.slice(1,-1))
mongoose.connect(process.env.CONNECTION_STRING).then(()=>{console.log('Database connection is ready')})
.catch((err)=>{console.log(err)
    console.log(process.env.CONNECTION_STRING)})
app.post(`${api}/products`,(req,res)=>{
    const newProduct=req.body
    console.log(newProduct)
    res.send(newProduct);
})
app.listen(3000,()=>{
    console.log('Server running http://localhost:3000');
})