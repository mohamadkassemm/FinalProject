const job = require('../models/jobModel');
const Company = require('../models/company');
const user = require('../models/userModel');

exports.getJobs = async (req, res) => {
    try {
        const jobs = await job.find();
        if (jobs.length == 0)
            return res.status(404).json({
                message: "No jobs found"
            });
        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getJobById = async (req, res) => {
    try {
        const job = await job.findById(req.params.id);
        if (!job)
            return res.status(404).json({
                message: "Job not found"
            });
        return res.json(job);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.createJob = async (req, res) => {
    const job = new job(req.body);
    try {
        const newJob = await job.save();
        return res.status(201).json(newJob);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

exports.updateJob = async (req, res) => {
    try {
        const job = await job.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!job)
            return res.status(404).json({
                message: "Job not found"
            });
        return res.json(job);
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
}

exports.deleteJob = async (req, res) => {
    try {
        const job = await job.findByIdAndDelete(req.params.id);
        if (!job)
            return res.status(404).json({
                message: "Job not found"
            });
        return res.json({
            message: "Job deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getJobsByCompany = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        const jobs = await job.find({
            company: company._id
        });
        if (jobs.length == 0)
            return res.status(404).json({
                message: "No jobs found for this company"
            });
        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getJobByType = async (req, req) => {
    try {
        const jobs = await job.find({
            type: req.params.type
        });
        if (jobs.length == 0)
            return res.status(404).json({
                message: "No jobs found in this type"
            });
        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getJobsByUser = async (req, res) => {
    try {
        const user = await user.findById(req.params.id);
        if (!user)
            return res.status(404).json({
                message: "User not found"
            });
        const jobs = await job.find({
            user: user._id
        });
        if (jobs.length == 0)
            return res.status(404).json({
                message: "No jobs found for this user"
            });
        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getJobsByLocation = async (req, res) => {
    try {
        const jobs = await job.find({
            location: req.params.location
        });
        if (jobs.length == 0)
            return res.status(404).json({
                message: "No jobs found in this location"
            });
        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getJobsBySalaryRange = async (req, res) => {
    try {
        const jobs = await job.find({
            salary: {
                $gte: req.params.min,
                $lte: req.params.max
            }
        });
        if (jobs.length == 0)
            return res.status(404).json({
                message: "No jobs found in this salary range"
            });
        return res.json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}