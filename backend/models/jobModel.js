const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const generalDataModel = require('./generalDataModel');

const jobModel = generalDataModel.discriminator('jobModel',new Schema({
    type:{
        type: String,
        required:true,
        enum: ['Full Time', 'Part Time', 'Internship']
    },
    requirements:{
        type: String,
        minLength:10,
    },
    location:{
        type: String,
        required:true,
        enum: ['on-site', 'remote', 'hybrid']
    },
    salary:{
        type: Number,
        required:true,
        min: 1,
    },
    companyID:{
        type: Number,
        required:true,
        min: 1,
        ref: 'Company'
    }
}));

module.exports = mongoose.model('Job', jobModel);