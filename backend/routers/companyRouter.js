const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

// Route to get companies that offer internships
router.get('/internships', companyController.getCompaniesOfferInternships);

// Route to get companies that offer jobs
router.get('/jobs', companyController.getCompaniesOfferJobs);

// Route to get companies that offer bootcamps
router.get('/bootcamps', companyController.getCompaniesOfferBootcamps);

// Route to get all companies
router.get('/', companyController.getCompanies);

// Route to get a company by ID
router.get('/:companyId', companyController.getCompanyById);

// Route to delete a company by ID
router.delete('/:companyId', companyController.deleteCompany);

//Route to search for companies by name
router.post('/search', companyController.searchCompany);

// Route to add a new internship to a company
router.post('/:id/internships', companyController.addCompanyInternship);

// Route to add a new job to a company
router.put('/:id/jobs', companyController.addCompanyJob);

// Route to add a new bootcamp offer to a company
router.put('/:id/bootcamps', companyController.addCompanyBootcamp);

// Route to get companies by location
router.get('/location/search', companyController.getCompaniesByLocation);

// Route to get companies by industry
router.get('/industry/search', companyController.getCompaniesByIndustry);

module.exports = router;