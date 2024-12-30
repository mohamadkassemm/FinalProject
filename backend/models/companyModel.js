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
        type: [String],
        default:[]
    },
    bootcampOffers: {
        type: [String],
        default:[]
    },
    internshipOffers: {
        type: [String],
        default:[]
    },
    linkedIn: {
        type: String,
    },
    workingUsersFromSite:{
        type:[Schema.Types.ObjectId],
        ref:'User',
        default:[]
    }
});

module.exports = mongoose.model('Company', companyModel);