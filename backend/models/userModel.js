const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Invalid email format'],
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    role:{
        type: String,
        required: true,
        enum: ['student', 'university', 'company'],
    },
    loginStatus:{
        type: Boolean,
        default: false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});

UserModel.pre('save', async (next)=>{
    try{
        if (!this.userID) {
            this.userID = this._id; 
        }
        next();
    }
    catch(error){
        console.log(error);
        next(error);
    }
});


module.exports = mongoose.model('User', UserModel);