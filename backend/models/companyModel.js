const mongoose=require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const User = require('./userModel');

const companyModel = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true
    },
    location:{
        type:String,
        required:true,
    },
    availablePositions:{
        type:[String],
        required:true,
    },
    bootcampOffers:{
        type:[String],
        required:true,
    },
    InternshipOffers:{
        type:[String],
        required:true,
    },
    linkedIn:{
        type:String,
        required:true,
    }
});

module.exports = companyModel;