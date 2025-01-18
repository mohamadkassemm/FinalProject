const express = require('express');
const router = express.Router();
const uni = require('../controllers/universityController');

router.get('/', uni.getUniversities);

router.get('/:id/favorites', uni.getFavs);

router.get('/:id', uni.getUniversityByID);

router.get('/major/:major', uni.getUniversitiesByMajor);

router.get('/governorate/:governorate', uni.getUniversitiesByGovernorate);

router.get('/sortedUniversities', uni.sortUniversities);

router.post('/search', uni.searchUniversities);

router.post('/university/major', uni.addMajorToUniversity);

router.delete('/university/major/:majorid', uni.removeMajorFromUniversity);

router.post('/university/bootcamp', uni.addBootcampToUniversity);

router.delete('/university/bootcamp/:bootcampid', uni.removeBootcampFromUniversity);

router.post('/university/student', uni.addStudentToUniversity);

router.delete('/university/student/:studentid', uni.removeStudentFromUniversity);

router.delete('/:id', uni.deleteUniversity)

router.get('/ID/:id', uni.getCompanyID)


module.exports = router;