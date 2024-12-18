const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentModel = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function (value) {
                const user = await mongoose.model('User').findById(value);
                return user !== null;
            },
            message: 'Invalid user ID'
        }
    },
    completedProfile:{
        type:Boolean,
        default:false,
    },
    gender:{
        type:[String],
        enum:["Male","Female"]
    },
    governorate:{
        type:String,
        enum:['North','South','Bekaa','Mount Lebanon','Beirut','Akkar','Baalbek-Hermel','Nabatieh']
    },
    degree: {
        type: String,
        required: [true, "This field is required"],
        enum: ['Terminal', 'Bachelor', 'Master', 'PhD'],
    },
    major: {
        type: String,
        required: [true, "This field is required"],
    },
    university: {
        type: String,
    },
    experience:{
        type:[String],
    },
    certification:{
        type:[String],
    },
    linkedIn:{
        type:String,
    },
    jobStatus: {
        type: String,
        required: [true, "This field is required"],
        enum: ['Unemployed', 'Part-time', 'Full-time', 'Self-employed'],
    },
    companyWorkingFor:{
        type:Schema.Types.ObjectId,
        ref:'Company',
        validate: {
            validator: function (value) {
                return (this.jobStatus === 'Part-time' || this.jobStatus === 'Full-time') ? !!value : true;//!!means that there should be a value and not null or undefined
            },
            message: 'CompanyWorkingFor is required if job status is Part-time or Full-time'
        }
    },
    bootcampStatus: {
        type: String,
        required: [true, "This field is required"],
        enum: ['No', 'Yes'],
    },
    favorites: {
        type: [{
            item: { type: mongoose.Schema.Types.ObjectId, required: true },
            itemType: {
                type: String,
                enum: ['University', 'Bootcamp', 'Event', 'Company','Job'],
                required: true
            }
        }],
        default: [] 
    },
    career:{
        type:String,
    }
});

module.exports = mongoose.model('Student', studentModel);