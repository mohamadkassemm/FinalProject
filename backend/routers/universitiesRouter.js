const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const uni = require('../controllers/universityController');

router.get('/',anyUserController.protect, uni.getUniversities);

router.get('/:id',anyUserController.protect, uni.getUniversityByID);

router.get('/major/:major',anyUserController.protect, uni.getUniversitiesByMajor);

router.get('/governorate/:governorate',anyUserController.protect, uni.getUniversitiesByGovernorate);

router.get('/sortedUniversities',anyUserController.protect, uni.sortUniversities);

router.post('/search',anyUserController.protect, uni.searchUniversities);

router.post('/university/major',anyUserController.protect, uni.addMajorToUniversity);

router.delete('/university/major/:majorid',anyUserController.protect, uni.removeMajorFromUniversity);

router.post('/university/bootcamp',anyUserController.protect, uni.addBootcampToUniversity);

router.delete('/university/bootcamp/:bootcampid',anyUserController.protect, uni.removeBootcampFromUniversity);

router.post('/university/student',anyUserController.protect, uni.addStudentToUniversity);

router.delete('/university/student/:studentid',anyUserController.protect, uni.removeStudentFromUniversity);

module.exports = router;