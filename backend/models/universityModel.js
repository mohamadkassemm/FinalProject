const mongoose=require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const User = require('./userModel');

const universityModel = User.discriminator('university', new Schema({
    location:{
        type:String,
        required:[true,"This field is required"],
    },
    availableMajors:{
        type: [String],
        required:[true,"This field is required"],
    },
    availablePositions:{
        type: [String],
        required:[true,"This field is required"],
    },
}));

module.exports = mongoose.model('University', universityModel);