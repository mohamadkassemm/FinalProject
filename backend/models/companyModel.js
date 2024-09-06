const mongoose=require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const User = require('./userModel');

const companyModel = User.discriminator('company', new Schema({
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
}));

module.exports = mongoose.model('Company', companyModel);