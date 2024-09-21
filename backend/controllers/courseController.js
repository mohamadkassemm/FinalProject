const Course = require('../models/courseModel');

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        if (courses.length == 0)
            return res.status(404).json({
                message: "No courses found"
            });
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course)
            return res.status(404).json({
                message: "Course not found"
            });
        return res.status(200).json(course);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.createCourse = async (req, res) => {
    const course = new Course(req.body);
    try {
        await course.save();
        return res.status(201).json(course);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!updatedCourse)
            return res.status(404).json({
                message: "Course not found"
            });
        return res.status(200).json(updatedCourse);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        if (!deletedCourse)
            return res.status(404).json({
                message: "Course not found"
            });
        return res.status(200).json({
            message: "Course deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCourseByName = async (req, res) => {
    try {
        const courses = await Course.find({
            name: req.params.name
        });
        if (courses.length == 0)
            return res.status(404).json({
                message: "No courses found with the specified name"
            });
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCoursesByDuration = async (req, res) => {
    try {
        const courses = await Course.find({
            duration: req.params.duration
        });
        if (courses.length == 0)
            return res.status(404).json({
                message: "No courses found with the specified duration"
            });
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCoursesByNbOfCredits = async (req, res) => {
    try {
        const courses = await Course.find({
            nbOfCredits: req.params.nbOfCredits
        });
        if (courses.length == 0)
            return res.status(404).json({
                message: "No courses found with the specified number of credits"
            });
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCoursesByPriceRange = async (req, res) => {
    try {
        const courses = await Course.find({
            price: {
                $gte: req.params.minPrice,
                $lte: req.params.maxPrice
            }
        });
        if (courses.length == 0)
            return res.status(404).json({
                message: "No courses found within the specified price range"
            });
        return res.status(200).json(courses);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}