const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name :{
        type: String,
        required: true, 
    },
    role:{
        type:String,
        required:true,
        default:"NORMAL",
    },
    email :{
        type: String,
        required: true,
        unique : true,
    },
    password:{
       type:String,
       required: true  
    }
},{
    timestamps: true,
})

const USER = mongoose.model("user",userschema);

module.exports = USER;