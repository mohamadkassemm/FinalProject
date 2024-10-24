const User = require('../models/userModel');
const Student = require("../models/studentModel");
const University = require("../models/universityModel");
const Company = require("../models/companyModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail= require("../utils/email").sendEmail;

const userCheck = async (req) => {
    const user = await User.findOne({
        $or:[{username:req.body["username"]},{email:req.body["email"]}]
    })
    return user;
}

const signToken = (id) => {
    return jwt.sign({id},
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, message, res) => {
    const token = signToken(user._id);

    res.status(statusCode).json({
        status: "Success",
        token,
        message,
        data:{
            user
        }
    });
}

const sendEmail = async (email, subject, message) => {
    try{
        
    }catch(err){
        console.error("Error sending email:", err);
        throw new Error("Email could not be sent.");
    }
}

exports.signUp = async (req, res) => {
    try {

        const user = await userCheck(req);
        if(user)
            return res.status(409).json({message: "username or email is already in use!"});

        const {
            name,
            email,
            username,
            password,
            confirmPassword,
            role
        } = req.body;

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                error: "Invalid email format"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            });
        }
        const newUser = new User({
            name,
            email,
            username,
            password,
            role
        });
        await newUser.save();

        let data;
        switch (role) {
            case "student": {
                const {
                    degree,
                    university,
                    major,
                    jobStatus,
                    bootcampStatus
                } = req.body;
                data = new Student({
                    userID: newUser._id,
                    degree,
                    university,
                    major,
                    jobStatus,
                    bootcampStatus
                });
                break;
            }
            case "university": {
                const {
                    location,
                    availableMajors,
                    availablePosition
                } = req.body;
                data = new University({
                    userID: newUser._id,
                    location,
                    availableMajors,
                    availablePosition
                });
                break;
            }
            case "company": {
                const {
                    industry,
                    location,
                    availablePositions,
                    bootcampOffers,
                    internshipOffers,
                    linkedIn
                } = req.body;
                data = new Company({
                    userID: newUser._id,
                    industry,
                    location,
                    availablePositions,
                    bootcampOffers,
                    internshipOffers,
                    linkedIn
                });
                break;
            }
            default:
                return res.status(400).json({
                    message: "Invalid user type"
                });
        }
        await data.save();

        createSendToken(newUser, 201, "Your account is created successfully!", res);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

exports.logIn = async (req, res) => {
    try {
        const user = await userCheck(req);
        if(!user)
            return res.status(404).json({messaege:"Invalid credentials!"})
        if (!bcrypt.compare(req.body["password"], user.password)) {
            return res.status(401).json({
                message: "Invalid credentials!"
            });
        }
        createSendToken(user, 200, "Logged in successfuly!", res);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.logout = async (req,res) => {
    try {
        const user = await User.findOne({username: req.params.username});
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }
        return res.status(200).json({
            loginStatus: user.loginStatus,
            message: "User logged out successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const user = await userCheck(req);
        if (!user) {
            return res.status(404).json({
                message: "No such Email or username!"
            });
        }
        const resetToken = user.generatePasswordResetToken();
        await user.save({validateBeforeSave:false});

        const url = `${req.protocol}://${req.get("host")}/api/user/resetPassword/${resetToken}`;

        const message =`Forgot your password? Reset it using this URL:${url}`;
        try{
            await sendEmail({
                email:user.email,
                subject:"Reset your password",
                message:message
            });
        }catch(err){
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save({validateBeforeSave:false});

        }
        return res.status(200).json({message:"Password reset link was sent to your email!"})
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
        const tokenHolder = await User.findOne({
            passwordResetToken:hashedToken,
            passwordResetExpires: {$gt:Date.now()}
        });

        if(!tokenHolder)
            return res.status(400).json({message:"Token has expired"});

        if(req.body["password"]!==req.body["confirmPassword"])
            return res.status(400).json({message:"Password and confirmPassword do not match"});

        hashedPassword= bcrypt.hash(req.body["password"],12);
        if(tokenHolder.password === hashedPassword)
            return res.status(400).json({message:"New password cannot be the same as the previous one! Please use another password"})

        tokenHolder.password= req.body["password"];
        tokenHolder.passwordResetToken= undefined;
        tokenHolder.passwordResetExpires= undefined;

        await tokenHolder.save();
        
        createSendToken(tokenHolder, 200, "Password changde successfully!", res);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.updatePassword = async (req, res) => {
    try{
        const user = await User.findById(req.params.userID);
        if(!user)
            return res.status(404).json({message:"User not found!"});
        if(req.body["password"] !== req.body["confirmPassword"])
            return res.status(209).json({message:"Passwords doesn't match!"});
        if(bcrypt.compare(req.body["password"],user.password))
            return res.status(409).json({message:"You can't use the old password"})
        user.psasword = req.body["password"];
        await user.save();
        createSendToken(user, 200, "Password changed successfully!", res);
    }catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.protect = async (req, res)=>{
    try{
        
    }catch(err){
        return res.status(500).json({
            message: err.message
        });
    }
}