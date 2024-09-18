const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const interestsModel = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    majors:{
        type: [Schema.Types.ObjectId],
        ref: 'Major',
        default:[]
    },
    bootcamps:{
        type: [Schema.Types.ObjectId],
        ref: 'Bootcamp',
        default:[]
    },
    jobs:{
        type: [Schema.Types.ObjectId],
        ref: 'Job',
        default:[]
    }
})

module.exports = mongoose.model('Interests',interestsModel);