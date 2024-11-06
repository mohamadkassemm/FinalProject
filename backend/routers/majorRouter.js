const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const majorController = require('../controllers/majorController');

// Get all majors
router.get('/',anyUserController.protect, majorController.getMajors);

// Get majors by university ID
router.get('/university/:universityId',anyUserController.protect, majorController.getMajorsByUniversity);

// Get majors by student ID
router.get('/student/:studentId',anyUserController.protect, majorController.getMajorsByStudent);

// Create a new major
router.post('/',anyUserController.protect, majorController.createMajor);

// Get recommended majors for a student
router.get('/recommended/:studentId',anyUserController.protect, majorController.recommendedMajors);

module.exports = router;
    