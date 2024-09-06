const mongoose = require('mongoose');
require('dotenv').config();

exports.connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}