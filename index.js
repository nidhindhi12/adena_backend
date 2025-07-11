const express = require('express');
const cors= require('cors');
const connection = require('./utils/connectdb')
const userroutes =require('./routes/userroutes')
const productroutes=require('./routes/productroutes')
const categoryroutes =require('./routes/categoryroutes')
const genderroutes =require('./routes/genderroutes')
const metalroutes=require('./routes/metalroutes')
const ocassionroutes =require('./routes/ocassionroutes')
const orderroutes = require('./routes/orderroutes');
const wishlistroutes=require('./routes/wishlistroutes');



const app= express();

app.use(express.json());
app.use(cors());
const port=5000;
app.use('/api',userroutes);
app.use('/product',productroutes);
app.use('/category',categoryroutes)
app.use('/gender',genderroutes);
app.use('/metal',metalroutes);
app.use('/ocassion',ocassionroutes)
app.use('/wishlist',wishlistroutes);
app.use('/order',orderroutes);


const startServer= async()=>{
    try {
        await connection();
        app.listen(port,()=>{
            console.log(`Server started successfully on port ${port}`);
        })
    } catch (error) {
        console.log('Server failed to start',error);
        
    }
}

startServer();
