const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recommendationModel = new Schema({
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
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Major', 'Bootcamp', 'Job', 'University'],
        required: true
    }
});

module.exports = mongoose.model('Recommendation', recommendationModel);