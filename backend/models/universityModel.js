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
        ref: 'Major',
    },
    availablePositions: {
        type: [
            {
                name: { type: String, required: true },
                description: { type: String, required: true },
                expectedSalary: { type: Number, required: true },
            }
        ],
        default: [],
    },
    ranking:{
        type: Number,
        min: 1,
    },
    students:{
        type: [Schema.Types.ObjectId],
        ref: 'Student',
        default:[]
    },
    website:{
        type:String
    },
    favorites: {
        type: [{
            item: { type: mongoose.Schema.Types.ObjectId, required: true },
            itemType: {
                type: String,
                enum: ['University', 'Bootcamp', 'Event', 'Company','Job'],
            }
        }],
        default: [] 
    }
});

module.exports = mongoose.model('University',universityModel);