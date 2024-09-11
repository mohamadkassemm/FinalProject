const bootcamp = require('../models/bootcampModel');
const Student = require('../models/studentModel');

exports.getBootcamps = async (req, res) => {
    try {
        const bootcamps = await bootcamp.find();
        if(bootcamps.length==0)
            return res.status(404).json({ message: "No bootcamps found" });
        return res.json(bootcamps);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getBootcampById = async (req, res) => {
    try {
        const bootcamp = await bootcamp.findById(req.params.id);
        if(!bootcamp) 
            return res.status(404).json({ message: "Bootcamp not found" });
        return res.json(bootcamp);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.createBootcamp = async (req, res) => {
    try {
        const newBootcamp = new bootcamp(req.body);
        const bootcamp = await newBootcamp.save();
        return res.status(201).json(bootcamp);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.updateBootcamp = async (req, res) => {
    try {
        const bootcamp = await bootcamp.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!bootcamp) 
            return res.status(404).json({ message: "Bootcamp not found" });
        return res.json(bootcamp);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.deleteBootcamp = async (req, res) => {
    try {
        const bootcamp = await bootcamp.findByIdAndDelete(req.params.id);
        if(!bootcamp) 
            return res.status(404).json({ message: "Bootcamp not found" });
        return res.json({ message: "Bootcamp deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getBootcampsByCategory = async (req, res) => {
    try{
        const bootcamps = await bootcamp.find({ category: req.params.category });
        if(bootcamps.length==0)
            return res.status(404).json({ message: "No bootcamps found for this category" });
        return res.json(bootcamps);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getBootcampsByLocation = async (req, res) => {
    try{
        const bootcamps = await bootcamp.find({ location: req.params.location });
        if(bootcamps.length==0)
            return res.status(404).json({ message: "No bootcamps found for this location" });
        return res.json(bootcamps);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getRecommendedBootcamps = async (req, res) => {
    try{
        const student = await Student.findById(req.params.id);
        const bootcamps = await bootcamp.find({student: student._id});
        if(bootcamps.length==0)
            return res.status(404).json({ message: "No recommended bootcamps found" });
        return res.json(bootcamps);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}