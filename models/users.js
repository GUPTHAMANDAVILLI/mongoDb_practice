const mongoose = require('mongoose')

const signpSchema =new mongoose.Schema({
    username :{
        type : String,
        required : true,
    },
    password :{
        type :String,
        required :true,
    }
})

const User = mongoose.model('User',signpSchema)

module.exports = User