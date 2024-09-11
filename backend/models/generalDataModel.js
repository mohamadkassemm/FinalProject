const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const generalDataModel = new Schema({
    id: {
        type: number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    industry:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('GeneralData', generalDataModel);