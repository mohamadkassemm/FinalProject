const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const jobController = require('../controllers/jobController');

// Get all jobs
router.get('/',anyUserController.protect, jobController.getJobs);

// Get a job by ID
router.get('/:id',anyUserController.protect, jobController.getJobById);

// Create a new job
router.post('/',anyUserController.protect, jobController.createJob);

// Update a job by ID
router.put('/:id',anyUserController.protect, jobController.updateJob);

// Delete a job by ID
router.delete('/:id',anyUserController.protect, jobController.deleteJob);

// Get jobs by company ID
router.get('/company/:id',anyUserController.protect, jobController.getJobsByCompany);

// Get jobs by type
router.get('/type/:type',anyUserController.protect, jobController.getJobByType);

// Get jobs by user ID
router.get('/user/:id',anyUserController.protect, jobController.getJobsByUser);

// Get jobs by location
router.get('/location/:location',anyUserController.protect, jobController.getJobsByLocation);

// Get jobs by salary range (min-max)
router.get('/salary/:min/:max',anyUserController.protect, jobController.getJobsBySalaryRange);

module.exports = router;
