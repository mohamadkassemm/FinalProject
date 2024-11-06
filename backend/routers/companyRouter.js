const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const companyController = require('../controllers/companyController');

// Route to get companies that offer internships
router.get('/internships',anyUserController.protect, companyController.getCompaniesOfferInternships);

// Route to get companies that offer jobs
router.get('/jobs',anyUserController.protect, companyController.getCompaniesOfferJobs);

// Route to get companies that offer bootcamps
router.get('/bootcamps',anyUserController.protect, companyController.getCompaniesOfferBootcamps);

// Route to get all companies
router.get('/',anyUserController.protect, companyController.getCompanies);

// Route to get a company by ID
router.get('/:companyId',anyUserController.protect, companyController.getCompanyById);

// Route to delete a company by ID
router.delete('/:companyId',anyUserController.protect, companyController.deleteCompany);

//Route to search for companies by name
router.post('/search',anyUserController.protect, companyController.searchCompany);

// Route to add a new internship to a company
router.post('/:id/internships',anyUserController.protect, companyController.addCompanyInternship);

// Route to add a new job to a company
router.put('/:id/jobs',anyUserController.protect, companyController.addCompanyJob);

// Route to add a new bootcamp offer to a company
router.put('/:id/bootcamps',anyUserController.protect, companyController.addCompanyBootcamp);

// Route to get companies by location
router.get('/location/search',anyUserController.protect, companyController.getCompaniesByLocation);

// Route to get companies by industry
router.get('/industry/search',anyUserController.protect, companyController.getCompaniesByIndustry);

module.exports = router;