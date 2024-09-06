const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generalDataModel = require('./generalDataModel');

const recommendationModel = generalDataModel.discriminator('recommendationModel', new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type:{
        type: String,
        enum: ['Major', 'Bootcamp', 'Job', 'University'],
        required: true
    }
}));

module.exports = mongoose.model('recommendationModel', recommendationModel);