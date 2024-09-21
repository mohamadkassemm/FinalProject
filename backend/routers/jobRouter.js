const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Get all jobs
router.get('/', jobController.getJobs);

// Get a job by ID
router.get('/:id', jobController.getJobById);

// Create a new job
router.post('/', jobController.createJob);

// Update a job by ID
router.put('/:id', jobController.updateJob);

// Delete a job by ID
router.delete('/:id', jobController.deleteJob);

// Get jobs by company ID
router.get('/company/:id', jobController.getJobsByCompany);

// Get jobs by type
router.get('/type/:type', jobController.getJobByType);

// Get jobs by user ID
router.get('/user/:id', jobController.getJobsByUser);

// Get jobs by location
router.get('/location/:location', jobController.getJobsByLocation);

// Get jobs by salary range (min-max)
router.get('/salary/:min/:max', jobController.getJobsBySalaryRange);

module.exports = router;
