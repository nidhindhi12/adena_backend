const mongoose = require('mongoose');

const metalmodel = new mongoose.Schema({
    metalname: {
        type: "String",
        required: true
    },
    image:
        
            {
                url: String,
                public_id: String
            }
        
}, { timestamps: true })


module.exports = mongoose.model("metal", metalmodel);