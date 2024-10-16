const University = require("../models/universityModel");
const major = require("../models/majorsModel");

exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        if (universities.length == 0)
            return res.status(404).json({
                message: "No universities found"
            });
        return res.status(200).json(universities);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

exports.getUniversityByID = async (req, res) => {
    try {
        const uni = await University.findById(req.params.id);
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getUniversitiesByMajor = async (req, res) => {
    const major = req.params.major;
    try {
        const unis = await University.find({
            majors: major
        });
        if (unis.length == 0)
            return res.status(404).json({
                message: "No universities found for this major"
            });
        return res.json(unis);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.getUniversitiesByLocation = async (req, res) => {
    const location = req.params.location;
    try {
        const unis = await University.find({
            location: location
        });
        if (unis.length == 0)
            return res.status(404).json({
                message: "No universities found in this location"
            });
        return res.json(unis);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.sortUniversities = async (req, res) => {
    const sortBy = req.query.sortby;
    try {
        const unis = await University.find();
        if (unis.length == 0)
            return res.status(404).json({
                message: "No universities found"
            });
        if (sortBy == "alphabetical")
            unis.sort({
                name: 1
            });
        else if (sortBy == "ranking")
            unis.sort({
                ranking: -1
            });
        else
            unis.sort({
                createdAt: 1
            });
        return res.json(unis);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.searchUniversities = async (req, res) => {
    const searchQuery = req.query.search;
    
    if (!searchQuery) {
        return res.status(400).json({
            message: "Search query cannot be empty."
        });
    }

    try {
        const universities = await University.find({
            $or: [
                { abbreviation: { $regex: `.*${searchQuery}.*`, $options: "i" } } // Search by abbreviation
            ]
        })
        .populate({
            path: 'userID',           // 1. Field to populate
            match: { name: { $regex: `.*${searchQuery}.*`, $options: 'i' } }, // 2. Conditions applied to populated documents
            select: 'name',           // 3. Fields to include from the populated document
        })
        .exec();

        const filteredUniversities = universities.filter(university => university.userID);
        
        if(filteredUniversities.length==0)
            return res.status(404).json({
                message: "No universities found matching the search query"
            });
        return res.status(200).json(universities);

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.updateUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.deleteUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndDelete(req.params.id);
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.status(200).json({
            message: "University deleted successfully"
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.addMajorToUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, {
            $push: {
                majors: req.body.majorid
            }
        }, {
            new: true
        });
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.removeMajorFromUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, {
            $pull: {
                majors: req.body.majorid
            }
        }, {
            new: true
        });
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.addBootcampToUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, {
            $push: {
                bootcamps: req.body.bootcampid
            }
        }, {
            new: true
        });
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.removeBootcampFromUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, {
            $pull: {
                bootcamps: req.body.bootcampid
            }
        }, {
            new: true
        });
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.addStudentToUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, {
            $push: {
                students: req.body.studentid
            }
        }, {
            new: true
        });
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}

exports.removeStudentFromUniversity = async (req, res) => {
    try {
        const uni = await University.findByIdAndUpdate(req.params.id, {
            $pull: {
                students: req.body.studentid
            }
        }, {
            new: true
        });
        if (!uni)
            return res.status(404).json({
                message: "University not found"
            });
        return res.json(uni);
    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
}