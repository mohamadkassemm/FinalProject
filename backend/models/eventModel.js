const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventModel = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
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
    booked: {
        type: [Schema.Types.ObjectId],
        ref: 'User',
        default: []
    }
});

module.exports = mongoose.model('Event', eventModel);