const mongoose = require('mongoose');

const ocassionmodel = new mongoose.Schema({
    ocassionname: {
        type: String,
        required: true
    },
    image:
        
            {
                url: String,
                public_id: String
            }
        
}, { timestamps: true })

module.exports = mongoose.model("ocassion", ocassionmodel);