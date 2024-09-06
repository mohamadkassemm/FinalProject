const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bootcampModel = new Schema({
    bootcampID:{
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    availableSpots:{
        type: Number,
        required: true,
    },
    location:{
        type: String,
        required: true,
        enum: ['on-site', 'remote', 'hybrid']
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    },
    companyID:{
        type: Number,
        required: true,
        ref: 'Company'
    }
});

module.exports = mongoose.model('Bootcamp', bootcampModel);