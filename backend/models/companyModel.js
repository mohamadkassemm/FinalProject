const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyModel = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
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
    description: {
        type: String,
    },
    logo:{
        type:String,
    },
    industry: {
        type: String,
        required: true,
    },
    governorate:{
        type: String,
        enum:['North','South','Bekaa','Mount Lebanon','Beirut','Akkar','Baalbek-Hermel','Nabatieh']
    },
    website:{
        type:String,
    },
    socialMediaLinks: {
        facebook: { type: String },
        linkedIn: { type: String },
        instagram: { type: String }
    },
    availablePositions: {
        type: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                expectedSalary: { type: Number, required: true },
            }
        ],
        default: [],
    },
    bootcampOffers: {
        type: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                expectedSalary: { type: Number, required: true },
            }
        ],
        default: [],
    },
    internshipOffers: {
        type: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                expectedSalary: { type: Number, required: true },
            }
        ],
        default: [],
    },
    
    linkedIn: {
        type: String,
    },
    workingUsersFromSite:{
        type:[Schema.Types.ObjectId],
        ref:'User',
        default:[]
    },
    favorites: {
        type: [{
            item: { type: mongoose.Schema.Types.ObjectId, required: true },
            itemType: {
                type: String,
                enum: ['University', 'Bootcamp', 'Event', 'Company','Job', 'Student'],
            }
        }],
        default: [] 
    }
});

module.exports = mongoose.model('Company', companyModel);