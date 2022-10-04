const express=require('express');
const morgan = require('morgan');
const mongoose=require('mongoose');

const app=express()
require('dotenv/config');
const api=process.env.API_URL

//middleware
app.use(express.json())
app.use(morgan('tiny'))

const productSchema=mongoose.Schema({
    name:String,
    image:String,
    countInStock:Number
})
const Product=mongoose.model('Product',productSchema);

app.get(`${api}/products`,(req,res)=>{
    const product={
        id:1,
        name:'hair dresser',
        image:'someurl',
    }

    res.send(product);
})
app.post(`${api}/products`,(req,res)=>{
    const newProduct=new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    })
    newProduct.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>res.status(500).json({
        error:err,
        success:false
    }))
})
mongoose.connect(process.env.CONNECTION_STRING,{})
.then(()=>{console.log('Database connection is ready')})
.catch((err)=>{console.log(err)
    console.log(process.env.CONNECTION_STRING)})

app.listen(3000,()=>{
    console.log('Server running http://localhost:3000');
})