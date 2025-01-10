const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const majorController = require('../controllers/majorController');

// Get all majors
router.get('/', majorController.getMajors);

// Get majors by university ID
router.get('/university/:universityId', majorController.getMajorsByUniversity);

// Get majors by student ID
router.get('/student/:studentId', majorController.getMajorsByStudent);

// Create a new major
router.post('/', majorController.createMajor);

// Get recommended majors for a student
router.get('/recommended/:studentId', majorController.recommendedMajors);

router.get('/:id', majorController.getMajorName)

module.exports = router;
    