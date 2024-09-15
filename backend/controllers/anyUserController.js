const User = require('../models/userModel');
const Student = require("../models/studentModel");
const University = require("../models/universityModel");
const Company = require("../models/companyModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const signToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
}

const createToken = (user, statusCode, res) => {
    const token = signToken(user);
    res.status(statusCode).json({
        status:"Success",
        token,
        data: user,
    });
}
exports.signUp = async (req, res) => {
    try {
        const emailCheck = await User.findOne({ email: req.body.email });

        const usernameCheck = await User.findOne({ username: req.body.username });

        if (emailCheck || usernameCheck) {
            return res.status(409).json({ error: "Email or Username already exists" });
        }
        const {name, email, username, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        let data;
        switch(role) {
            case "student":{
                const {degree, university, major, jobStatus, bootcampStatus}= req.body;
                data = new Student({name, email, username, password: hashedPassword, degree, university, major, jobStatus, bootcampStatus});
                break;
            }
            case "university":{
                const {location, availableMajors, availablePosition}= req.body;
                data = new University({name, email, username, password: hashedPassword, location, availableMajors, availablePosition});
                break;  
            }
            case "company":{
                const {location, availablePositions, bootcampOfers, internshipOffers, linkedIn}=req.body;
                data = new Company({name, email, username, password: hashedPassword, location, availablePositions, bootcampOfers, internshipOffers, linkedIn});
                break;
            }
            default:
                return res.status(400).json({message: "Invalid user type"});
        }
        createToken(data, 201, res);
        return res.status(200).json({message: "Data saved successfully", data: data});
    }catch(err){
        return res.status(500).json({message: err.message});
    }
};


exports.logIn = async (req, res) => {
    try {    
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(401).json({ message: "No such Username!" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password!" });
        }
        createToken(user, 200, res);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}