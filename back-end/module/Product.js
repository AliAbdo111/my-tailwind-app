const mongoose = require('mongoose');


const productSchema=new mongoose.Schema({
    name:String,
    category:String,
    location:String,
    discreption:String,
    price:Number,
    imgUrl:[String]    
})



module.exports= mongoose.model('Product',productSchema)