const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generalDataModel = require('./generalDataModel');

const eventModel = generalDataModel.discriminator('eventModel', new Schema({
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    organizerID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    booked:{
        type:[Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
}));

module.exports = eventModel;