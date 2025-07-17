const usermodel = require('../model/UserModel');
const bcrypt = require('bcryptjs')
const sentmail = require('../utils/Nodemailer');
const { JWT_SECRET } = require('../utils/config')
const Jwt = require('jsonwebtoken');
import { Base_url } from '../../frontend/src/components/BaseUrL';


//#region add user
const adduser = async (req, res) => {
    try {
        const user = req.body;
        console.log("hcjhdfj", user)
        if (!req.body || typeof req.body.password !== 'string') {
            return res.status(400).json({ message: "❌ Password is missing or invalid." });
        }

        if (!user) {
            return res.status(400).json({ status: false, data: { message: 'user is null' } });
        }
        const hashpassword = bcrypt.hashSync(user.password, 10);
        const dbuser = new usermodel({
            firstname: user.firstname, lastname: user.lastname, email: user.email, phonenumber: user.phonenumber, password: hashpassword, usertype: user.usertype,
        })
        await dbuser.save();
        // generate token for verify
        const token = Jwt.sign({ _id: dbuser._id, }, JWT_SECRET, { expiresIn: '1d' });

        const verifylink = `${Base_url}verify-email/${token}`;
        const existuser = await usermodel.findOne({ phonenumber: user.phonenumber });
        if (!existuser) {
            return res.status(400).json({ status: false, data: { message: 'User doesnt exists' } });
        }
        const sub = "Welcome to our Website";
        const text = `Hii! ${user.firstname} ${user.lastname} thanks for signing up !!`;
        const html = `<h2>Verify your email</h2>
            <p>Click the button below to verify your email:</p>
            <a href="${verifylink}" style="padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none;">Verify Email</a>
            <p>If you didn’t request this, you can ignore this email.</p>`;

        const mailsent = await sentmail(user.email, sub, text, html)
        if (!mailsent) {
            return res.status(400).json({ status: false, data: { message: 'email not sent' } });
        }
        return res.status(200).json({ status: true, data: { message: 'user data successfully.', data: dbuser } });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: false, data: { message: 'Internal server error', data: error } });

    }

}
//#endregion

//#region  loginuser
const loginuser = async (req, res) => {
    try {
        const userdetail = req.body;
        if (!userdetail)
            return res.status(400).json({ status: false, date: { message: 'Fields are empty' } });
        const dbuser = await usermodel.findOne({ email: userdetail.email });
        if (!dbuser) {
            return res.status(400).json({ status: false, data: { message: 'Email not found' } });
        }
        const checkpass = await bcrypt.compare(userdetail.password, dbuser.password)
        if (!checkpass) {
            return res.status(400).json({ status: false, data: { message: 'Invalid Password' } })
        }
        const token = Jwt.sign({ _id: dbuser._id }, JWT_SECRET);
        return res.status(200).json({ status: true, data: { message: 'Login successfully.', data: dbuser, token: token } })
    } catch (error) {
        return res.status(500).json({ status: false, data: { message: 'internal server error.', data: error } })
    }
}
// middleware
const AuthVerify = async (req, res) => {
    return res.status(200).json({ status: true, data: { message: 'Authentication verified', data: req.user } })
}

const readalluser = async (req, res) => {
    try {
        const userdata = await usermodel.find();
        if (!userdata) {
            return res.status(400).json({ status: false, data: { message: 'user data is null' } });
        }
        return res.status(200).json({ status: true, data: { message: "category read successfully", data: userdata } })
    } catch (error) {
        return res.status(500).json({ status: false, data: { message: 'Internal server error.' }, data: error });
    }
}
const updateuser = async (req, res) => {
    try {
        const userid = req.params.id;

        if (!userid) {
            return res.status(400).json({ status: false, data: { message: 'user data is null' } });
        }
        const user = req.body;
        const dbuser = await usermodel.updateOne({ _id: userid }, {
            firstname: user.firstname, lastname: user.lastname, email: user.email, phonenumber: user.phonenumber, usertype: user.usertype, streetaddress: user.streetaddress,
            town: user.town, state: user.state, country: user.country, pincode: user.pincode
        })
        return res.status(200).json({ status: true, data: { message: 'User updated successfully', data: dbuser } });
    } catch (error) {
        console.log(error);
        console.log(error);
        return res.status(500).json({ status: false, data: { message: 'Internal server error.' }, data: error });
    }

}
const verifyemail = async (req, res) => {
    const token = req.params.token;
    if (!token) {
        return res.status(400).json({ status: false, message: 'token is null' });
    }
    try {
        const decoded = Jwt.verify(token, JWT_SECRET);
        const userId = decoded._id;
        await usermodel.findByIdAndUpdate(userId, { isVerified: true });
        return res.status(200).json({ status: true, data: { message: 'Email verified successfully' } });
    } catch (error) {
        return res.status(400).json({ status: false, data: { message: 'Invalid or expired verification link.' } });
    }
}
const resetpasswordlink = async (req, res) => {
    const { userId } = req.params;


    try {
        const user = await usermodel.findOne({ _id: userId });

        if (!user) {
            return res.status(400).json({ status: false, data: { message: 'User not found' } });
        }
        const token = Jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '15m' });
        const resetlink = `${Base_url}reset-password/${user._id}/${token}`;
        // await sentmail(user.email, 'Password Reset', `Click the link to reset your password: ${resetlink}`);
        const sub = "Reset Password";
        const text = 'Click on this link below';
        const html = `
            <p>Click the button below to reset password</p>
            <a href="${resetlink}" style="padding: 10px 15px; background-color: #28a745; color: white; text-decoration: none;">Verify Email</a>
            <p>If you didn’t request this, you can ignore this email.</p>`;

        const mailsent = await sentmail(user.email, sub, text, html)
        if (!mailsent) {
            return res.status(400).json({ status: false, data: { message: 'email not sent' } });
        }
        return res.json({ status: true, message: 'Password reset link sent to your email' });

    } catch (error) {
        return res.status(500).json({ status: false, message: 'Error sending reset email', error: error.message });
    }
}
const resetpassword = async (req, res) => {
    const { userId, token } = req.params;

    const { newPassword } = req.body;

    if (!token) {
        return res.status(400).json({ status: false, message: 'token is null' });
    }
    if (!userId) {
        return res.status(400).json({ status: false, data: { message: 'User ID is null' } });
    }

    try {
        const decoded = Jwt.verify(token, JWT_SECRET);
        const user_id = decoded.userId;
        if (user_id !== userId) {
            return res.status(401).json({ message: 'Unauthorized or invalid token' });
        }
        const user = await usermodel.findOne({ _id: userId })
        if (!user) {
            return res.status(400).json({ status: false, data: { message: 'User not found' } });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.json({ status: true, message: 'Password reset successful' });
    } catch (error) {
        return res.status(400).json({ status: false, data: { message: 'Failed to reset password' } });

    }
}
module.exports = { adduser, loginuser, AuthVerify, readalluser, updateuser, verifyemail, resetpassword, resetpasswordlink };


