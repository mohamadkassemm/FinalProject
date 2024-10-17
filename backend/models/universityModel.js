const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const universityModel = new Schema({
    userID:{
        type: Schema.Types.ObjectId, 
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
    abbreviation:{
        type: String,
        required:[true,"This field is required"],
    },
    location:{
        type:String,
        required:[true,"This field is required"],
    },
    availableMajors:{
        type: [Schema.Types.ObjectId],
        required:[true,"This field is required"],
        ref: 'Major',
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