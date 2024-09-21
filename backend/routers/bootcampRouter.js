const express = require('express');
const router = express.Router();
const bootcampController = require('../controllers/bootcampController');

// Get all bootcamps
router.get('/', bootcampController.getBootcamps);

// Get a bootcamp by ID
router.get('/:id', bootcampController.getBootcampById);

// Create a new bootcamp
router.post('/', bootcampController.createBootcamp);

// Update a bootcamp by ID
router.put('/:id', bootcampController.updateBootcamp);

// Delete a bootcamp by ID
router.delete('/:id', bootcampController.deleteBootcamp);

// Get bootcamps by category
router.get('/category/:category', bootcampController.getBootcampsByCategory);

// Get bootcamps by location
router.get('/location/:location', bootcampController.getBootcampsByLocation);

// Get recommended bootcamps for a student by student ID
router.get('/recommended/:id', bootcampController.getRecommendedBootcamps);

module.exports = router;