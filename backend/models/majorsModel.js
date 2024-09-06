const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const majorModel= new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        trim:true
    },
    description:{
        type:String,
        required:true,
        minLength:10,
        trim:true
    },
    courseCount:{
        type:Number,
        required:true,
        min:1
    },
    totalCost:{
        type:Number,
        required:true,
        min:0
    },
    studentCount:{
        type:Number,
        min:0,
    },
    nbOfSemester:{
        type:Number,
        min:6,
        max:14,
        default:6
    }
})

module.exports = mongoose.model('Major', majorModel);