const Student = require('../models/studentModel');
const University = require('../models/universityModel');

exports.getStudents = async (req, res) => {
    try{
        const students = await Student.find();
        if(students.length==0)
            return res.status(404).json({ message: "No students found" });
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({message: err.message});
    }
}

exports.getStudentById = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
        if(!student)
            return res.status(404).json({ message: "Student not found" });
        return res.status(200).json(student);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.updateStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!student)
            return res.status(404).json({ message: "Student not found" });
        return res.status(200).json(student);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.deleteStudent = async (req, res) => {
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        if(!student)
            return res.status(404).json({ message: "Student not found" });
        return res.status(200).json({ message: "Student deleted successfully" });
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentsByMajor = async (req, res) => {
    const major = req.params.major;
    try{
        const students = await Student.find({ major: major });
        if(students.length==0)
            return res.status(404).json({ message: "No students found for this major" });
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentsByUniversity = async (req, res) => {
    try{
        const universityID = req.params.UniversityID;
        const university = await University.find(universityID);
        if(!university)
            return res.status(404).json({ message:"University not found!"});
        const Students = await Students.find({universityID: universityID});
        if(Students.length<=0)
            return res.status(404).json({ message:"No students found for this University!"});
        return res.status(200).json(Students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentByDegree = async (req, res) => {
    try{
        const students = await Student.find({degree: req.params.degree});
        if(students.length<=0)
            return res.status(404).json({message:"No students found having degree " + req.params.degree});
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentsByInterests = async (req, res) => {
    try{
        const interests = req.params.interests;
        const students = await Student.find({interests: interests});
        if(students.length<=0)
            return res.status(404).json({message: 'No students found having such interest'})
        return res.statu(200).json(students);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

exports.getStudentsAvailableForJob = async (req, res) => {
    try{
        const students = await Student.find({jobStatus:"Unemplyed"});
        if(students.length<=0)
            return res.status(400).json({message:"No students available for job"});
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

exports.getEmployedStudents = async (req, res) => {
    try{
        const students = await Student.find({ jobStatus: { $ne: "Unemployed" } });
        if(students.length <=0)
            return res.status(400).json({ message: "No employed students found" });
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentsWorkingPartTime = async (req, res) => {
    try{
        const students = await Student.find({jobStatus:"Part-time"});
        if(students.length <=0)
            return res.status(400).json({ message: "No students working part-time found" });
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentsWorkingFullTime = async (req, res) => {
    try{
        const students = await Student.find({ jobStatus:"Full-time"});
        if(students.length <=0)
            return res.status(400).json({ message: "No students working full-time found" });
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentsSelfEmployed = async (req, res) => {
    try{
        const students = await Student.find({ jobStatus:"Self-employed"});
        if(students.length <=0)
            return res.status(400).json({ message: "No students self-employed found" });
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getStudentsByBootcampStatus = async (req, res) => {
    try{
        const students = await Student.find({ bootcampStatus: req.params.bootcampStatus });
        if(students.length <=0)
            return res.status(400).json({ message: "No students found with this bootcamp status" });
        return res.status(200).json(students);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}