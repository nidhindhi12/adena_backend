const nodemailer = require('nodemailer');
const { EMAIL, PASSWORD } = require('./config');


const tranporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    },

});


const sentmail = async (to, subject, text, html) => {
    const mailbox = {
        to: to,
        subject: subject,
        text: text,
        html: html,
    }
    try {
            await tranporter.sendMail(mailbox);
            return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

module.exports=sentmail;
