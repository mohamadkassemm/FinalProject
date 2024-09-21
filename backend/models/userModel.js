const mongoose = require('mongoose');
const {
    default: isEmail
} = require('validator/lib/isEmail');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserModel = new Schema({
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
    loginStatus: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

UserModel.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        this.password = await bcrypt.hash(this.password, 12);
    } catch (error) {
        console.log(error);
        next(error);
    }
});



module.exports = mongoose.model('User', UserModel);