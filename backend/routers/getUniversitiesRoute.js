const express = require('express');
const router = express.Router();

const uni = require('../controllers/universityController');

router.get('/', uni.getUniversities);

module.exports = router;