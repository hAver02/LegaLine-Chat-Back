
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    nombre : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    casos : [{
        type : Schema.ObjectId,
        ref : 'casos',
        unique : true,
        default : [],
    }],
    amigos : [{
        type : Schema.ObjectId,
        ref : 'Users',
        default : []
    }]
})

const userModel = mongoose.model('Users', userSchema)


module.exports = userModel