const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const generalDataModel = require('./generalDataModel');

const courseModel = generalDataModel.discriminator('courseModel',new Schema({
    name:{
        type:String,
        required:[true,"This field is required"],
        minLength:3,
        trim:true,
    },
    duration:{
        type:Number,
        required:[true,"This field is required"],
    },
    prerequisites:{
        type:[String],
        default:[]
    },
    nbOfCredits:{
        type:Number,
        required:[true,"This field is required"],
    },
}));

module.exports = mongoose.model('Course',courseModel);