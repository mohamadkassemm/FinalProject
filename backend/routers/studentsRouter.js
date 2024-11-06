const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const studentController = require('../controllers/studentController');

// Get all students
router.get('/',anyUserController.protect, studentController.getStudents);

// Get student by ID
router.get('/:id',anyUserController.protect, studentController.getStudentById);

// Update student by ID
router.put('/:id',anyUserController.protect, studentController.updateStudent);

// Delete student by ID
router.delete('/:id',anyUserController.protect, studentController.deleteStudent);

// Get students by major
router.get('/major/:major',anyUserController.protect, studentController.getStudentsByMajor);

// Get students by university
router.get('/university/:UniversityID',anyUserController.protect, studentController.getStudentsByUniversity);

// Get students by degree
router.get('/degree/:degree',anyUserController.protect, studentController.getStudentByDegree);

// Get students by interests
router.get('/interests/:interests',anyUserController.protect, studentController.getStudentsByInterests);

// Get students available for a job (Unemployed)
router.get('/job/availableForJob',anyUserController.protect, studentController.getStudentsAvailableForJob);

// Get employed students (not Unemployed)
router.get('/job/employed',anyUserController.protect, studentController.getEmployedStudents);

// Get students working part-time
router.get('/job/working-part-time',anyUserController.protect, studentController.getStudentsWorkingPartTime);

// Get students working full-time
router.get('/job/working-full-time',anyUserController.protect, studentController.getStudentsWorkingFullTime);

// Get self-employed students
router.get('/job/self-employed',anyUserController.protect, studentController.getStudentsSelfEmployed);

// Get students by bootcamp status
router.get('/bootcampStatus/:bootcampStatus',anyUserController.protect, studentController.getStudentsByBootcampStatus);

// Get student's interests by user ID
router.get('/:id/interests',anyUserController.protect, studentController.getInterestsByUserID);

// Add an interest to a student by user ID
router.post('/:id/interests',anyUserController.protect, studentController.addInterest);

// Delete an interest from a student by user ID
router.delete('/:id/interests',anyUserController.protect, studentController.deleteInterest);

// Update an interest for a student by user ID
router.put('/:id/interests',anyUserController.protect, studentController.updateInterest);

// Get bootcamps student is interested in
router.get('/:id/interests/bootcamps',anyUserController.protect, studentController.getBootcampsInterestedIn);

// Get jobs student is interested in
router.get('/:id/interests/jobs',anyUserController.protect, studentController.getJobsInterestedIn);

// Get universities student is interested in
router.get('/:id/interests/universities',anyUserController.protect, studentController.getUniversitiesInterestedIn);

//get student recommendations
router.get('/:id/recommendations',anyUserController.protect, studentController.getStudentRecommendations);

module.exports = router;