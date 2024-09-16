const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const studentModel = new Schema({
    userID:{
        type: Schema.Types.ObjectId, 
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

module.exports = mongoose.model('Student', studentModel);