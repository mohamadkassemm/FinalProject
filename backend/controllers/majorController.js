const Major = require('../models/majorsModel');
const University = require('../models/universityModel');
const User = require('../models/userModel');

exports.getMajors = async (req, res) => {
    try{
        const majors = await Major.find();
        if(majors.length==0)
            return res.status(404).json({ message: "No majors found" });
        return res.status(200).json(majors);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

exports.getMajorsByUniversity = async (req, res) => {
    try{
        const university = await University.findById(req.params.universityId);
        if(!university)
            return res.status(404).json({ message: "University not found" });
        const majors = await Major.find({ university: university._id });
        if(majors.length==0)
            return res.status(404).json({ message: "No majors found for this university" });
        return res.status(200).json(majors);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

exports.getMajorsByStudent = async (req, res) => {
    try{
        const student = await User.findById(req.params.studentId);
        if(!student)
            return res.status(404).json({ message: "Student not found" });
        const majors = await Major.find({ students: student._id });
        if(majors.length==0)
            return res.status(404).json({ message: "No majors found for this student" });
        return res.status(200).json(majors);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

exports.createMajor = async (req, res) => {
    try{
        const major = new Major(req.body);
        await major.save();
        return res.status(201).json(major);
    }catch(err){
        return res.status(400).json({message: err.message});
    }
}

exports.recommendedMajors= async (req, res) => {
    try{
        const student = await User.findById(req.params.studentId);
        if(!student)
            return res.status(404).json({ message: "Student not found" });
        const majors = await Major.find({ students: student._id });
        if(majors.length==0)
            return res.status(404).json({ message: "No majors found for this student" });
        return res.status(200).json(majors);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}