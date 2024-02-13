const mongoose = require('mongoose');

const commentSchema=new mongoose.Schema({
    name:{
        type:String
    },
    comment:String
})

module.exports=mongoose.model('Comment',commentSchema)