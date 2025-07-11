const mongoose = require('mongoose');

const categorymodel = new mongoose.Schema({
    categoryname: {
        type: String,
        required: true,
        unique: true

    }
}, { timestamps: true })
module.exports = mongoose.model('category', categorymodel);