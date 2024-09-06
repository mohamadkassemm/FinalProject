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
        const emailCheck = await Student.findOne({ email: req.body.email }) || 
                           await University.findOne({ email: req.body.email }) || 
                           await Company.findOne({ email: req.body.email });

        const usernameCheck = await Student.findOne({ username: req.body.username }) || 
                              await University.findOne({ username: req.body.username }) || 
                              await Company.findOne({ username: req.body.username });

        if (emailCheck || usernameCheck) {
            return res.status(409).json({ error: "Email or Username already exists" });
        }
        let Model;
        let data = {}; 
        switch(req.body.type) {
            case "student":{
                const { firstName, lastName, email, username, password, confirmPassword, phoneNumber, address, educationLevel } = req.body;
                if (!validator.isEmail(email)) {
                    return res.status(400).json({ message: "Invalid email address" });
                }
                if(password !== confirmPassword){
                    return res.status(400).json({ message: "Passwords do not match" });
                }
                data = { firstName, lastName, email, username, password, phoneNumber, address, educationLevel };
                Model=Student;
                break;
            }
            case "university":{
                const { Name, email, username, password, confirmPassword, phoneNumber, address, description } = req.body;
                if (!validator.isEmail(email)) {
                    return res.status(400).json({ message: "Invalid email address" });
                }
                if(password !== confirmPassword){
                    return res.status(400).json({ message: "Passwords do not match" });
                }
                data = { Name, lastName, email, username, password, phoneNumber, address, description};
                Model=University;
                break;
            }
            case "company":{
                const { Name, industry, email, username, password, confirmPassword, phoneNumber, address, description } = req.body;
                if (!validator.isEmail(email)) {
                    return res.status(400).json({ message: "Invalid email address" });
                }
                if(password !== confirmPassword){
                    return res.status(400).json({ message: "Passwords do not match" });
                }
                data= { Name, industry, email, username, password, phoneNumber, address, description };
                Model=Company;
                break;
            }
            default:
                return res.status(400).json({ message: "Invalid type" });
        }
        data.password=await bcrypt.hash(data.password,12);
        const user = await Model.create(data);
        createToken(user, 201, res);
        return res.status(200).json({message: "Data saved successfully", data: data});
    }catch(err){
        res.status(500).json({message: err.message});
        console.error(err);
    }
};


exports.logIn = async (req, res) => {
    try {    
        const user = await (Student.findOne({ username: req.body.username }) || University.findOne({ username: req.body.username }) || Company.findOne({ username: req.body.username }));
        if (!user) {
            return res.status(401).json({ message: "No such Username!" });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password!" });
        }
        createToken(user, 200, res);
    }catch(err){
        res.status(500).json({ message: err.message });
        console.error(err);
    }
}