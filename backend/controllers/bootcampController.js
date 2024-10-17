const Bootcamp = require('../models/bootcampModel');
const Student = require('../models/studentModel');

exports.getBootcamps = async (req, res) => {
    try {
        const bootcamps = await Bootcamp.find();
        if (bootcamps.length == 0)
            return res.status(404).json({
                message: "No bootcamps found"
            });
        return res.json(bootcamps);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getBootcampById = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);
        if (!bootcamp)
            return res.status(404).json({
                message: "Bootcamp not found"
            });
        return res.json(bootcamp);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.createBootcamp = async (req, res) => {
    try {
        const newBootcamp = new Bootcamp(req.body);
        await newBootcamp.save();
        return res.status(201).json(newBootcamp);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

exports.updateBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!bootcamp)
            return res.status(404).json({
                message: "Bootcamp not found"
            });
        return res.json(bootcamp);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

exports.deleteBootcamp = async (req, res) => {
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
        if (!bootcamp)
            return res.status(404).json({
                message: "Bootcamp not found"
            });
        return res.json({
            message: "Bootcamp deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getBootcampsByLocation = async (req, res) => {
    try {
        const location= req.query.location;
        console.log(location);
        const bootcamps = await Bootcamp.find({
            location: location
        });
        if (bootcamps.length === 0)
            return res.status(404).json({
                message: "No bootcamps found for this location"
            });
        return res.status(201).json(bootcamps);
    } catch (err) {
        console.log("Error occurred at:", err.stack);
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getRecommendedBootcamps = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if(!student)
            return res.status(404).json({
                message: "Student not found"
            });
        const bootcamps = await Bootcamp.find({
            student: student._id
        });
        if (bootcamps.length == 0)
            return res.status(404).json({
                message: "No recommended bootcamps found"
            });
        return res.status(201).json(bootcamps);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}