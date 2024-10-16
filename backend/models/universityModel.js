const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const universityModel = new Schema({
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
        type: [Schema.Types.ObjectId],
        ref: 'Student',
    }
});

module.exports = mongoose.model('University',universityModel);