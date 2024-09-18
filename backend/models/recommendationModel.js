const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generalDataModel = require('./generalDataModel');

const recommendationModel = generalDataModel.discriminator('recommendationModel', new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
        validate: {
            validator: async function(value) {
                const user = await mongoose.model('User').findById(value);
                return user !== null;
            },
            message: 'Invalid user ID'
        }
    },
    type:{
        type: String,
        enum: ['Major', 'Bootcamp', 'Job', 'University'],
        required: true
    }
}));

module.exports = recommendationModel;