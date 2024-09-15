const express = require('express');
const router = express.Router();

const uni = require('../controllers/universityController');

router.get('/universities', uni.getUniversities);

router.get('/university/:id', uni.getUniversityByID);

router.get('/university/:major:', uni.getUniversitiesByMajor);

router.get('/university/:location', uni.getUniversitiesByLocation);

router.get('/sortedUniversities', uni.sortUniversities);

router.get('/universities/search:', uni.searchUniversities);

router.post('/addUniversity', uni.addUniversity);

router.put('/updateUniversity/:id', uni.updateUniversity);

router.delete('/deleteUniversity/:id', uni.deleteUniversity);

router.post('/university/:major', uni.addMajorToUniversity);

router.delete('/university/:major/:id', uni.removeMajorFromUniversity);

router.post('/university/:bootcamp', uni.addBootcampToUniversity);

router.delete('/university/:bootcamp/:id', uni.removeBootcampFromUniversity);

router.post('/university/:student', uni.addStudentToUniversity);

router.delete('/university/:student/:id', uni.removeStudentFromUniversity);

module.exports = router;