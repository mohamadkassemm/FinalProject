const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const uni = require('../controllers/universityController');

router.get('/',anyUserController.protect, uni.getUniversities);

router.get('/:id',anyUserController.protect, uni.getUniversityByID);

router.get('/major/:major',anyUserController.protect, uni.getUniversitiesByMajor);

router.get('/location/:location',anyUserController.protect, uni.getUniversitiesByLocation);

router.get('/sortedUniversities',anyUserController.protect, uni.sortUniversities);

router.post('/search',anyUserController.protect, uni.searchUniversities);

router.put('/updateUniversity/:id',anyUserController.protect, uni.updateUniversity);

router.delete('/deleteUniversity/:id',anyUserController.protect, uni.deleteUniversity);

router.post('/university/:id/major',anyUserController.protect, uni.addMajorToUniversity);

router.delete('/university/:uniid/major/:majorid',anyUserController.protect, uni.removeMajorFromUniversity);

router.post('/university/:id/bootcamp',anyUserController.protect, uni.addBootcampToUniversity);

router.delete('/university/:uniid/bootcamp/:bootcampid',anyUserController.protect, uni.removeBootcampFromUniversity);

router.post('/university/:id/student',anyUserController.protect, uni.addStudentToUniversity);

router.delete('/university/:uniid/student/:studentid',anyUserController.protect, uni.removeStudentFromUniversity);

module.exports = router;