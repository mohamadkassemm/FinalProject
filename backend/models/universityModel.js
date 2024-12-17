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
    logo:{
        type:String,
        required:false
    },
    description:{
        type:String,
    },
    abbreviation:{
        type: String,
    },
    governorate:{
        type: String,
        enum:['North','South','Bekaa','Mount Lebanon','Beirut','Akkar','Baalbek-Hermel','Nabatieh']
    },
    numberOfBranches:{
        type: Number,
    },
    availableMajors:{
        type: [Schema.Types.ObjectId],
        required:[true,"This field is required"],
        ref: 'Major',
    },
    availablePositions:{
        type: [String],
        required:[true,"This field is required"],
        default:[],
    },
    ranking:{
        type: Number,
        min: 1,
    },
    students:{
        type: [Schema.Types.ObjectId],
        ref: 'Student',
        default:[]
    }
});

module.exports = mongoose.model('University',universityModel);