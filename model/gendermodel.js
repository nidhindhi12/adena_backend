const mongoose = require('mongoose');


const gendermodel = new mongoose.Schema({
    gendername: {
        type: String,
        required: true,
    },
    image:{
        url: String,
        public_id: String
    }

}, { timestamps: true })

module.exports = mongoose.model("gender", gendermodel);