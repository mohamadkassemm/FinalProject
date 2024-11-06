const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController')
const bootcampController = require('../controllers/bootcampController');

// Get bootcamps by location
router.get('/location',anyUserController.protect, bootcampController.getBootcampsByLocation);

// Get recommended bootcamps for a student by student ID
router.get('/recommended/:id',anyUserController.protect, bootcampController.getRecommendedBootcamps);

// Get all bootcamps
router.get('/',anyUserController.protect, bootcampController.getBootcamps);

// Get a bootcamp by ID
router.get('/:id',anyUserController.protect, bootcampController.getBootcampById);

// Create a new bootcamp
router.post('/',anyUserController.protect, bootcampController.createBootcamp);

// Update a bootcamp by ID
router.put('/:id',anyUserController.protect, bootcampController.updateBootcamp);

// Delete a bootcamp by ID
router.delete('/:id',anyUserController.protect, bootcampController.deleteBootcamp);

module.exports = router;