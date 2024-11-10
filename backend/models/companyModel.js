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
    industry: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    availablePositions: {
        type: [String],
        required: true,
    },
    bootcampOffers: {
        type: [String],
        required: true,
    },
    internshipOffers: {
        type: [String],
        required: true,
    },
    linkedIn: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Company', companyModel);