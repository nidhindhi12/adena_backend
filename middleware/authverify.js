const { JWT_SECRET } = require("../utils/config");
const jwt = require('jsonwebtoken')
const usermodel = require('../model/UserModel')

const Auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token)
        return res.status(400).json({ status: false, data: { message: "Your token is null" } });
    try {

        const user = jwt.verify(token, JWT_SECRET)
        console.log(user)
        if (!user) {
            return res.status(400).json({ status: false, data: { message: "Invalid token" } });
        }
        
        const dbuser = await usermodel.findById({ _id: user._id }).select("-password");
        console.log(dbuser);
        if (!dbuser) {
            return res.status(400).json({ status: false, data: { message: "Unauthorised access" } });
        }
        req.user = dbuser
        next();
    } catch (error) {
        return res.status(400).json({ status: false, data: { messsage: "Internal server error", data: error } });
    }
}


module.exports = Auth;