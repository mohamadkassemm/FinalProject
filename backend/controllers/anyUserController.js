const User = require('../models/userModel');
const Student = require("../models/studentModel");
const University = require("../models/universityModel");
const Company = require("../models/companyModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signToken = (user) => {
    return jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createToken = (user, statusCode, res) => {
    const token = signToken(user);
    res.status(statusCode).json({
        status: "Success",
        token,
        data: user,
    });
}
exports.signUp = async (req, res) => {
    try {
        const email = req.body.email;
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                error: "Invalid email format"
            });
        }

        const emailCheck = await User.findOne({
            email: req.body.email
        });

        const usernameCheck = await User.findOne({
            username: req.body.username
        });

        if (emailCheck || usernameCheck) {
            return res.status(409).json({
                error: "Email or Username already exists"
            });
        }
        
        const {
            name,
            username,
            password,
            confirmPassword,
            role
        } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword,
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
        return createToken(newUser, 201, res);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

exports.logIn = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) {
            return res.status(401).json({
                message: "No such Username!"
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password,12);
        if (hashedPassword === user.password) {
            return res.status(401).json({
                message: "Incorrect password!"
            });
        }
        user.loginStatus = true;
        createToken(user, 200, res);
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
        user.loginStatus = false;
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
        const user = await User.findOne({
            email: req.body.email
        });
        if (!user) {
            return res.status(401).json({
                message: "No such Email!"
            });
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "10m"});
        const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;
        await sendEmail(user.email, "Reset Password", `Click this link to reset your password: ${url}`);
        return res.status(200).json({
            message: "Reset password link sent to your email"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username
        });
        if (!user) {
            return res.status(401).json({
                message: "No such Username!"
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            message: "Password reset successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}