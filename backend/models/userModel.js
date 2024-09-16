const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const { default: isEmail } = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserModel = new Schema({
    ID:{
        type:Number,
        unique: true,
        min: 1,
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

UserModel.plugin(AutoIncrement, { inc_field: 'ID' });

UserModel.pre('save', async function (next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
});



module.exports = mongoose.model('User', UserModel);