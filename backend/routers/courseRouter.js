const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Route to get all courses
router.get('/', courseController.getCourses);

// Route to get a course by ID
router.get('/:id', courseController.getCourseById);

// Route to create a new course
router.post('/', courseController.createCourse);

// Route to update a course by ID
router.put('/:id', courseController.updateCourse);

// Route to delete a course by ID
router.delete('/:id', courseController.deleteCourse);

// Route to get courses by name
router.get('/name/:name', courseController.getCourseByName);

// Route to get courses by duration
router.get('/duration/:duration', courseController.getCoursesByDuration);

// Route to get courses by number of credits
router.get('/credits/:nbOfCredits', courseController.getCoursesByNbOfCredits);

// Route to get courses by price range
router.get('/price/:minPrice/:maxPrice', courseController.getCoursesByPriceRange);

module.exports = router;