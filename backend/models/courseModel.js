const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    Name:{
        type:String,
        required:[true,"This field is required"],
        minLength:3,
        trim:true,
    },
    Description:{
        type:String,
        required:[true,"This field is required"],
        minLength:10,
        trim:true,
    },
    Duration:{
        type:Number,
        required:[true,"This field is required"],
    },
    Prerequisites:{
        type:String,
        required:[true,"This field is required"],
        trim:true,
    },
    nbOfCredits:{
        type:Number,
        required:[true,"This field is required"],
    },
});

module.exports = mongoose.model('Course', courseSchema);