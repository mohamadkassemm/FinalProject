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

exports.getUniversityByID = async (req, res) =>{
    try{
        const uni = await University.find(req.params.id);
        if(!uni) 
            return res.status(404).json({ message: "University not found" });
        return res.json(uni);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getUniversitiesByMajor = async (req, res) =>{
    const majorID = req.params.majorid;
    try{
        const unis = await University.find({ majors: majorID });
        if(unis.length==0)
            return res.status(404).json({ message: "No universities found for this major" });
        return res.json(unis);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.getUniversitiesLocation = async (req, res) =>{
    const location = req.params.location;
    try{
        const unis = await University.find({ location: location });
        if(unis.length==0)
            return res.status(404).json({ message: "No universities found in this location" });
        return res.json(unis);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

exports.sortUniversities = async (req, res) =>{
    const sortBy = req.params.sortby;
    try{
        const unis = await University.find();
        if(unis.length==0)
            return res.status(404).json({ message: "No universities found" });
        if(sortBy=="alphabetical")
            unis.sort({name:1});
        else if(sortBy=="ranking")
            unis.sort({ranking:-1});
        else 
            unis.sort({createdAt:1});
        return res.json(unis);
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
}

