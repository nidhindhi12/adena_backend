const mongoose = require('mongoose')
const { MONGODB_URL } = require('./config');


const connectdb = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        if (error.name == 'MongooseServerSelectionError') {
            console.error('Error:Connection refused.Please check if  server is accessible')
        }
        else {
            console.error('Error while connecting to Database server');

        }
        process.exit(1);
    }
}
module.exports = connectdb;