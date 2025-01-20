const Company = require('../models/companyModel');
const User = require('../models/userModel');
const Bootcamp = require('../models/bootcampModel');
const Job = require('../models/jobModel');


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
        const company = await Company.findById(req.params.companyId);
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

exports.searchCompany = async (req, res) => {
    const searchQuery = req.query.search;
    
    if (!searchQuery) {
        return res.status(400).json({
            message: "Search query cannot be empty."
        });
    }
    try{
        const companies = await User.find({
            name: {$regex: `.*${searchQuery}.*`, $options: 'i'},
            role: 'company'
        })
        if(companies.length===0)
            return res.status(404).json({
                message: "No companies found with the specified name"
            });
        return res.status(200).json(companies);
    }catch(err){
        return res.status(500).json({
            message: err.message
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
        const company = await Company.findByIdAndUpdate(req.body.id, {
            $push: {
                internshipOffers:  { $each: req.body.internshipOffers }
            }
        }, {
            new: true
        });
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        await company.save();
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.removeInternshipFromCompany = async (req, res)=>{
    try{
        const company = await Company.findById(req.body.id);
        if(!company)
            return res.status(404).json({message:"Something wrong happened! Please try again later."});
        const internship= await Job.findById(req.params.inernshipId);
        if(!internship)
            return res.status(404).json({message:"Internship not found!"})
        await company.updateOne({
            $pull:{internshipOffers:internship}
        })
        await company.save();
        return res.status(201).json({message:"Internship removed successfully!"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

exports.addCompanyJob = async (req, res) => {
    try {
        const { id, availablePositions } = req.body;

        // Validate input
        if (!id || !availablePositions || !Array.isArray(availablePositions)) {
            return res.status(400).json({ message: "Invalid input" });
        }

        // Update the company's available positions
        const company = await Company.findById(id)

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }

        company.availablePositions = availablePositions;
        await company.save();
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


exports.removeJobFromCompany = async (req, res)=>{
    try{
        const company = await Company.findById(req.body.id);
        if(!company)
            return res.status(404).json({message:"Something wrong happened! Please try again later."});
        const job= await Job.findById(req.params.jobID);
        if(!job)
            return res.status(404).json({message:"Position not found!"})
        await company.updateOne({
            $pull:{availablePositions:job}
        })
        await company.save();
        return res.status(201).json({message:"Position removed successfully!"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

exports.addCompanyBootcamp = async (req, res) => {
    try {
        const company = await Company.findByIdAndUpdate(req.body.id, {
            $push: {
                bootcampOffers: { $each: req.body.bootcampOffers }
            }
        }, {
            new: true
        });
        if (!company)
            return res.status(404).json({
                message: "Company not found"
            });
        await company.save();
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

exports.removeBootcampFromCompany = async (req, res)=>{
    try{
        const company = await Company.findById(req.body.id);
        if(!company)
            return res.status(404).json({message:"Something wrong happened! Please try again later."});
        const bootcamp= await Bootcamp.findById( req.params.bootcampID);
        if(!bootcamp)
            return res.status(404).json({message:"Bootcamp not found!"})
        await company.updateOne({
            $pull:{bootcampOffers:bootcamp}
        })
        await company.save();
        return res.status(201).json({message:"Bootcamp removed successfully!"})
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

exports.getCompaniesByGovernorate = async (req, res) => {
    try {
        const companies = await Company.find({
            governorate: req.query.governorate
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

exports.getCompanyID = async (req, res) => {
     try{
        const userID = req.params.id;
        const company = await Company.findOne({userID:userID});
        if(!company)
            return res.status(404).json({message:"User not found!"})
        return res.status(202).json(company._id)
    }catch(err){
        return res.status(500).json({message:err.message})
    }
}