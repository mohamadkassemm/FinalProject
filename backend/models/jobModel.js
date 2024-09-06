const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobModel = new Schema({
    jobId:{
        type: number,
        required:true,
        unique:true
    },
    title:{
        type: String,
        required:true,
        minLength:3,
    },
    type:{
        type: String,
        required:true,
        enum: ['Full Time', 'Part Time', 'Internship']
    },
    description:{
        type: String,
        minLength:10,
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
});

module.exports = mongoose.model('Job', jobModel);