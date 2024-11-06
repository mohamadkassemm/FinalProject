const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const courseController = require('../controllers/courseController');

// Route to get all courses
router.get('/',anyUserController.protect, courseController.getCourses);

// Route to get a course by ID
router.get('/:id',anyUserController.protect, courseController.getCourseById);

// Route to create a new course
router.post('/',anyUserController.protect, courseController.createCourse);

// Route to update a course by ID
router.put('/:id',anyUserController.protect, courseController.updateCourse);

// Route to delete a course by ID
router.delete('/:id',anyUserController.protect, courseController.deleteCourse);

// Route to get courses by name
router.get('/name/:name',anyUserController.protect, courseController.getCourseByName);

// Route to get courses by duration
router.get('/duration/:duration',anyUserController.protect, courseController.getCoursesByDuration);

// Route to get courses by number of credits
router.get('/credits/:nbOfCredits',anyUserController.protect, courseController.getCoursesByNbOfCredits);

// Route to get courses by price range
router.get('/price/:minPrice/:maxPrice',anyUserController.protect, courseController.getCoursesByPriceRange);

module.exports = router;