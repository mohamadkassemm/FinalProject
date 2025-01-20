const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const companyController = require('../controllers/companyController');

// Route to get companies that offer internships
router.get('/internships', companyController.getCompaniesOfferInternships);

// Route to get companies that offer jobs
router.get('/jobs', companyController.getCompaniesOfferJobs);

// Route to get companies that offer bootcamps
router.get('/bootcamps', companyController.getCompaniesOfferBootcamps);

// Route to get companies by governorate
router.get('/governorate/',  companyController.getCompaniesByGovernorate);

// Route to get all companies
router.get('/', companyController.getCompanies);

// Route to get a company by ID
router.get('/:companyId', companyController.getCompanyById);

//Route to search for companies by name
router.post('/search', companyController.searchCompany);

// Route to add a new internship to a company
router.put('/internships', companyController.addCompanyInternship);

// Route to remove internship from company
router.delete('/internship',  companyController.removeInternshipFromCompany);

// Route to add a new job to a company
router.post('/jobs', companyController.addCompanyJob);

// Route to remove job from company
router.delete('/job',  companyController.removeJobFromCompany);

// Route to add a new bootcamp offer to a company
router.put('/bootcamps', companyController.addCompanyBootcamp);

// Route to remove job from company
router.delete('/bootcamp',  companyController.removeBootcampFromCompany);

// Route to get companies by industry
router.get('/industry/search', companyController.getCompaniesByIndustry);

router.get('/ID/:id', companyController.getCompanyID)


module.exports = router;