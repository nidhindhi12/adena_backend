const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,

    },
    phonenumber: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    usertype: {
        type: String,
        default: 'user'
    },
     streetaddress: {
        type: String,

    },
    country: {
        type: String
    },
    state: {
        type: String,

    },
    town: {
        type: String,

    },
    pincode: {
        type: Number,

    },
   isVerified: {
        type:Boolean,
        default:false,  
    }

})

module.exports = mongoose.model('users', userSchema);