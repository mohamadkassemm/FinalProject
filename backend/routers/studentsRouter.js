const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Get all students
router.get('/', studentController.getStudents);

// Get student by ID
router.get('/:id', studentController.getStudentById);

// Update student by ID
router.put('/:id', studentController.updateStudent);

// Delete student by ID
router.delete('/:id', studentController.deleteStudent);

// Get students by major
router.get('/major/:major', studentController.getStudentsByMajor);

// Get students by university
router.get('/university/:UniversityID', studentController.getStudentsByUniversity);

// Get students by degree
router.get('/degree/:degree', studentController.getStudentsByDegree);

// Get students by interests
router.get('/interests/:interests', studentController.getStudentsByInterests);

// Get students available for a job (Unemployed)
router.get('/available-for-job', studentController.getStudentsAvailableForJob);

// Get employed students (not Unemployed)
router.get('/employed', studentController.getEmployedStudents);

// Get students working part-time
router.get('/working-part-time', studentController.getStudentsWorkingPartTime);

// Get students working full-time
router.get('/working-full-time', studentController.getStudentsWorkingFullTime);

// Get self-employed students
router.get('/self-employed', studentController.getStudentsSelfEmployed);

// Get students by bootcamp status
router.get('/bootcamp-status/:bootcampStatus', studentController.getStudentsByBootcampStatus);

// Get student's interests by user ID
router.get('/:id/interests', studentController.getInterestsByUserID);

// Add an interest to a student by user ID
router.post('/:id/interests', studentController.addInterest);

// Delete an interest from a student by user ID
router.delete('/:id/interests', studentController.deleteInterest);

// Update an interest for a student by user ID
router.put('/:id/interests', studentController.updateInterest);

// Get bootcamps student is interested in
router.get('/:id/interests/bootcamps', studentController.getBootcampsInterestedIn);

// Get jobs student is interested in
router.get('/:id/interests/jobs', studentController.getJobsInterestedIn);

// Get universities student is interested in
router.get('/:id/interests/universities', studentController.getUniversitiesInterestedIn);

module.exports = router;