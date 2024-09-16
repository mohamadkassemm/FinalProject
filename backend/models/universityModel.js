const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const universityModel = new Schema({
    userID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', // Reference to the User model
        required: true
    },
    location:{
        type:String,
        required:[true,"This field is required"],
    },
    availableMajors:{
        type: [String],
        required:[true,"This field is required"],
    },
    availablePositions:{
        type: [String],
        required:[true,"This field is required"],
    },
    ranking:{
        type: Number,
        min: 1,
    },
    students:{
        type: [Number],
        ref: 'Student',
    }
});

module.exports = mongoose.model('University',universityModel);