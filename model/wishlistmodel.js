const mongoose = require('mongoose')

const wishlistmodel = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('wishlist', wishlistmodel);

