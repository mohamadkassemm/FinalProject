const mongoose = require('mongoose');
const crypto = require('crypto');
const {
    default: isEmail
} = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserModel = new Schema({
    completedProfile:{
        type:Boolean,
        default:false,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Invalid email format'],
    },
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [{
            validator: (username) => /^[a-z0-9]+$/.test(username),
            message: 'Username can only contain alphanumeric characters',
        }, ],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: {
        type: String,
        required: true,
        enum: ['student', 'university', 'company'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    loginToken:{
        type:String
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date
});

UserModel.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            next();
        }
        this.password = await bcrypt.hash(this.password, 12);
        if(this.isNew)
            next();
        this.passwordChangedAt=Date.now()-1000;
    } catch (error) {
        console.log(error);
        next(error);
    }
});

UserModel.methods.generatePasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.passwordResetExpires = Date.now() + 10*60*1000;

    return resetToken;
}

UserModel.methods.passwordChangeAfterIssuingToken = function(JWTtimestamp){
    if(this.passwordChangedAt){
        const passwordChangedTime = parseInt(this.passwordChangedAt.getTime()/1000,10);
        return passwordChangedTime > JWTtimestamp;
    }
    return false;
}

module.exports = mongoose.model('User', UserModel);