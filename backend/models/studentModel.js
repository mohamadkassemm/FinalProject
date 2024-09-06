const mongoose=require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const User = require('./userModel');

const studentModel = User.discriminator('Student',new Schema({
    degree:{
        type:String,
        required:[true,"This field is required"],
        enum:['Bachelor', 'Master', 'PhD'],
    },
    interests:{
        type: [String],
        required:[true,"This field is required"],
    },
    universityID:{
        type: number,
        ref: 'University',
        required:[true,"This field is required"],
    },
    jobStatus:{
        type: String,
        required:[true,"This field is required"],
        enum:['Employed', 'Unemployed', 'Part-time','Full-time', 'Self-employed'],
    },
    bootcampStatus:{
        type: String,
        required:[true,"This field is required"],
        enum:['No', 'Yes'],
    },
}));

module.exports = mongoose.model('Student', studentModel);