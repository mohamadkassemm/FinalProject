const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseModel = new Schema({
    name: {
        type: String,
        required: [true, "This field is required"],
        minLength: 3,
        trim: true,
    },
    description: {
        type: String,
    },
    duration: {
        type: Number,
        required: [true, "This field is required"],
    },
    prerequisites: {
        type: [String],
        default: []
    },
    nbOfCredits: {
        type: Number,
        required: [true, "This field is required"],
    },
    price: {
        type: Number,
        min: 1,
        max: 10000,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer.'
        }
    }
});

module.exports = mongoose.model('Course', courseModel);