const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
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
router.get('/degree/:degree', studentController.getStudentByDegree);

// Get students by interests
router.get('/interests/:interests', studentController.getStudentsByInterests);

// Get students available for a job (Unemployed)
router.get('/job/availableForJob', studentController.getStudentsAvailableForJob);

// Get employed students (not Unemployed)
router.get('/job/employed', studentController.getEmployedStudents);

// Get students working part-time
router.get('/job/working-part-time', studentController.getStudentsWorkingPartTime);

// Get students working full-time
router.get('/job/working-full-time', studentController.getStudentsWorkingFullTime);

// Get self-employed students
router.get('/job/self-employed', studentController.getStudentsSelfEmployed);

// Get students by bootcamp status
router.get('/bootcampStatus/:bootcampStatus', studentController.getStudentsByBootcampStatus);

// remove fav
router.delete('/:userID/favorites', studentController.removeFavorite)

//add favorites
router.post('/:userID/favorites', studentController.addFavorites)

// Get favorites
router.get('/:id/favorites', studentController.getFavorites);

//Get fav jobs
router.get('/favorite/jobs',  studentController.getJobsInterestedIn);

//Get fav bootcamps
router.get('/favorite/bootcamps',  studentController.getBootcampsInterestedIn);

//Get fav universities
router.get('/favorite/university',  studentController.getUniversitiesInterestedIn);

router.get('/ID/:id', studentController.getStudentID);

router.get('complete/:id', studentController.checkIfCompleted)

module.exports = router;