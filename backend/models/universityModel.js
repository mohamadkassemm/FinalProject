const mongoose=require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const Major = require('./majorsModel');

const universityModel = new Schema({
    Name:{
        type:String,
        required:[true,"This field is required"],
        minLength:3,
        trim:true,
    },
    address:{
        type:String,
        required:[true,"This field is required"],
        minLength:4,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"This field is required"],
        validate: [isEmail,"Please enter a valid email"],
    },
    username:{
        type:String,
        required:[true,"This field is required"],
        unique:true,
        minLength:6,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:[true,"This field is required"],
        minLength:8,
        trim:true,
    },
    confirmPassword:{
        type:String,
        required:[true,"This field is required"],
        minLength:8,
        trim:true,
        validate:{
            validator: (password) => {
                return password === confirmPassword;
            },
            message: "Passwords do not match"
        }
    },
    passwordChangedSt:Date,
    phoneNumber:{
        type:String,
        length:9,
        trim:true,
    },
    description:{
        type:String,
        required:[true,"This field is required"],
        minLength:20,
        trim:true,
    },
    listOfAvailableMajors:{
        type:[Major.schema],
        required:[true,"This field is required"],
        minLength:1,
    },
});

universityModel.pre('save', async function(next){
    try{
        if(!this.isModified('password')){
            return next();
        }
        this.password = await bcrypt.hash(this.password, 'sha256');
        this.confirmPassword = undefined;
    }
    catch(error){
        console.log(error);
    }
})

module.exports = mongoose.model('University', universityModel);