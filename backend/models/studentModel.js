const mongoose=require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const User = require('./userModel');

const studentModel = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true
    },
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
        type: Number,
        ref: 'University',
        required:[true,"This field is required"],
    },
    jobStatus:{
        type: String,
        required:[true,"This field is required"],
        enum:['Unemployed', 'Part-time','Full-time', 'Self-employed'],
    },
    bootcampStatus:{
        type: String,
        required:[true,"This field is required"],
        enum:['No', 'Yes'],
    },
    major:{
        type: String,
        required:[true,"This field is required"],
    }
});

module.exports = studentModel;