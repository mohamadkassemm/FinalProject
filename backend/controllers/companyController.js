const Company = require('../models/companyModel');

exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        if (companies.length == 0)
            return res.status(404).json({
                message: "No companies found"
            });
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCompanyById = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.deleteCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        res.json({
            message: "Company deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCompaniesOfferInternships = async (req, res) => {
    try {
        const companies = await Company.find({
            internships: {
                $exists: true,
                $not: {
                    $size: 0
                }
            }
        });
        if (companies.length == 0)
            return res.status(404).json({
                message: "No companies offering internships found"
            });
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCompaniesOfferJobs = async (req, res) => {
    try {
        const companies = await Company.find({
            availablePositions: {
                $exists: true,
                $not: {
                    $size: 0
                }
            }
        });
        if (companies.length == 0)
            return res.status(404).json({
                message: "No companies offering jobs found"
            });
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCompaniesOfferBootcamps = async (req, res) => {
    try {
        const companies = await Company.find({
            bootcampOffers: {
                $exists: true,
                $not: {
                    $size: 0
                }
            }
        });
        if (companies.length == 0)
            return res.status(404).json({
                message: "No companies offering bootcamps found"
            });
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.addCompanyInternship = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $push: {
                internships: req.body
            }
        }, {
            new: true
        });
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.addCompanyJob = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $push: {
                availablePositions: req.body
            }
        }, {
            new: true
        });
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.addCompanyBootcamp = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, {
            $push: {
                bootcampOffers: req.body
            }
        }, {
            new: true
        });
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCompaniesByLocation = async (req, res) => {
    try {
        const companies = await Company.find({
            location: req.query.location
        });
        if (companies.length == 0)
            return res.status(404).json({
                message: "No companies found in the specified location"
            });
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.getCompaniesByIndustry = async (req, res) => {
    try {
        const companies = await Company.find({
            industry: req.query.industry
        });
        if (companies.length == 0)
            return res.status(404).json({
                message: "No companies found in the specified industry"
            });
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}