const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bootcampModel = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    availableSpots: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: ['on-site', 'remote', 'hybrid']
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    companyID: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Company'
    }
});

module.exports = mongoose.model('Bootcamp', bootcampModel);