const express = require('express');
const router = express.Router();

const uni = require('../controllers/universityController');

router.get('/', uni.getUniversities);

router.get('/university/:id', uni.getUniversityByID);

router.get('/university/major/:major', uni.getUniversitiesByMajor);

router.get('/university/location/:location', uni.getUniversitiesByLocation);

router.get('/sortedUniversities', uni.sortUniversities);

router.get('/universities/search', uni.searchUniversities);

router.put('/updateUniversity/:id', uni.updateUniversity);

router.delete('/deleteUniversity/:id', uni.deleteUniversity);

router.post('/university/:id/major', uni.addMajorToUniversity);

router.delete('/university/:uniid/major/:majorid', uni.removeMajorFromUniversity);

router.post('/university/:id/bootcamp', uni.addBootcampToUniversity);

router.delete('/university/:uniid/bootcamp/:bootcampid', uni.removeBootcampFromUniversity);

router.post('/university/:id/student', uni.addStudentToUniversity);

router.delete('/university/:uniid/student/:studentid', uni.removeStudentFromUniversity);

module.exports = router;