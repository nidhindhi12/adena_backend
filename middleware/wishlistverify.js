const { JWT_SECRET } = require("../utils/config");
const jwt = require('jsonwebtoken');
const usermodel = require('../model/UserModel')

const wishlistverify = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(400).json({ status: false, message: 'token is null' });
            }
            const decoded = jwt.verify(token, JWT_SECRET);
            req.user = await usermodel.findById(decoded._id).select('-password');
            next();
        } catch (error) {
            return res.status(400).json({ status: false, data: { messsage: "Internal server error", data: error } });
        }
    }
    else
    {
        return res.status(400).json({status:false,message:"authorization failed"});
    }
}
module.exports= wishlistverify