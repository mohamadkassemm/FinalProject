const event = require('../models/eventModel');
const user = require('../models/userModel');

exports.getEvents = async (req, res) => {
    try {
        const events = await event.find();
        if(events.length==0)
            return res.status(404).json({ message: "No events found" });
        return res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.createEvent = async (req, res) => {
    const event = new event(req.body);
    try {
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const event = await event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!event)
            return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const event = await event.findByIdAndDelete(req.params.id);
        if(!event)
            return res.status(404).json({ message: "Event not found" });
        res.json({ message: "Event deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getEventById = async (req, res) => {
    try {
        const event = await event.findById(req.params.id);
        if(!event)
            return res.status(404).json({ message: "Event not found" });
        res.json(event);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getEventsByUniversity = async (req, res) => {
    try {
        const university = await user.findById(req.params.universityId);
        if(!university)
            return res.status(404).json({ message: "University not found" });
        const events = await event.find({ university: university._id });
        res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getEventsByCompany = async (req, res) => {
    try {
        const company = await user.findById(req.params.companyId);
        if(!company)
            return res.status(404).json({ message: "Company not found" });
        const events = await event.find({ company: company._id });
        res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getEventsByLocation = async (req, res) => {
    const location = req.params.location;
    try {
        const events = await event.find({ location: location });
        if(events.length==0)
            return res.status(404).json({ message: "No events found in this location" });
        res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getEventsByDate = async (req, res) => { 
    const date = new Date(req.params.date);
    try {
        const events = await event.find({ date: date });
        if(events.length==0)
            return res.status(404).json({ message: "No events found within this date range" });
        res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }   
}

exports.getEventsByTitle = async (req, res) => {
    const title = req.params.title;
    try {
        const events = await event.find({ title: title });
        if(events.length==0)
            return res.status(404).json({ message: "No events found for this topic" });
        res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getEventsByIndustry = async (req, res) => {
    const industry = req.params.industry;
    try {
        const events = await event.find({ industry: industry });
        if(events.length==0)
            return res.status(404).json({ message: "No events found in this industry" });
        res.json(events);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.getEventsByStudent = async (req, res) => {
    try{
        const student = await user.findById(req.params.studentId);
        if(!student)
            return res.status(404).json({ message: "Student not found" });
        const events = await event.find({ students: student._id });
        return res.json(events);
    }catch(err) {
        return res.status(500).json({ message: err.message });
    }
}
