const Major = require('../models/majorsModel');
const University = require('../models/universityModel');
const User = require('../models/userModel');
const Student = require('../models/studentModel');

exports.getMajors = async (req, res) => {
    try {
        const majors = await Major.find();
        if (majors.length == 0)
            return res.status(404).json({
                message: "No majors found"
            });
        return res.status(200).json(majors);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getMajorDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const major = await Major.findById(id);
        if (!major)
            return res.status(404).json({
                message: "No majors found"
            });
        return res.status(200).json(major);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getMajorsByUniversity = async (req, res) => {
    try {
        const university = await University.findById(req.params.universityId);
        if (!university)
            return res.status(404).json({
                message: "University not found"
            });
        const majors = await Major.find({
            university: university._id
        });
        if (majors.length == 0)
            return res.status(404).json({
                message: "No majors found for this university"
            });
        return res.status(200).json(majors);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getMajorsByStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student)
            return res.status(404).json({
                message: "Student not found"
            });
        const majors = await Major.find({
            students: student._id
        });
        if (majors.length === 0)
            return res.status(404).json({
                message: "No majors found for this student"
            });
        return res.status(200).json(majors);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.createMajor = async (req, res) => {
    try {
        
        const { name, description, courseCount, totalCost, studentCount, nbOfSemester } = req.body;
        const majorData = {
            name: name, 
            description: description, 
            courseCount,
            totalCost,
            studentCount: studentCount , 
            nbOfSemester: nbOfSemester , 
        };

        const major = new Major(majorData);

        await major.save();

        return res.status(201).json({
            message: "Major created successfully",
            major: major
        });

    } catch (err) {
        return res.status(500).json({
            message: "An error occurred while creating the major: " + err.message
        });
    }
};


exports.recommendedMajors = async (req, res) => {
    try {
        const student = await Student.findById(req.params.studentId);
        if (!student)
            return res.status(404).json({
                message: "Student not found"
            });
        const majors = await Major.find({
            students: student._id
        });
        if (majors.length == 0)
            return res.status(404).json({
                message: "No recommended majors found for this student"
            });
        return res.status(200).json(majors);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getMajorName = async (req, res) => {
    try {
        const majorID = req.params.id;
        const major = await Major.findById(majorID).lean()
        if(!major)
            return res.status(404).json({message:"No major found with this ID!"})
        return res.status(200).json(major.name);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}