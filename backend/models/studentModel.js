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
    degree: {
        type: String,
        required: [true, "This field is required"],
        enum: ['Bachelor', 'Master', 'PhD'],
    },
    interests: {
        type: [String],
        required: [true, "This field is required"],
    },
    universityID: {
        type: Number,
        ref: 'University',
    },
    jobStatus: {
        type: String,
        required: [true, "This field is required"],
        enum: ['Unemployed', 'Part-time', 'Full-time', 'Self-employed'],
    },
    bootcampStatus: {
        type: String,
        required: [true, "This field is required"],
        enum: ['No', 'Yes'],
    },
    major: {
        type: String,
        required: [true, "This field is required"],
    },
    interests: {
        bootcamps: [String],
        jobs: [String],
        universities: [String],
    },
    recommendations: [{
        type: Schema.Types.ObjectId,
        refPath: 'recommendationType', // Dynamically determines the referenced model
    }],
    recommendationType: [{
        type: String,
        required: true,
        enum: ['Job', 'University', 'Bootcamp'], // The models to reference
    }],
});

module.exports = mongoose.model('Student', studentModel);