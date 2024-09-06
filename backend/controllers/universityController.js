const University = require("../models/universityModel");

exports.getUniversities = async (req, res) => {
    try {
        const universities = await University.find();
        if(universities.length==0)
            return res.status(404).json({ message: "No universities found" });
        return res.json(universities);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

