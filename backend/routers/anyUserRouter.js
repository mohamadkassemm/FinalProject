const express = require('express');
const router = express.Router();
const anyUser = require('../controllers/anyUserController');

router.post('/signup', anyUser.signUp);

router.post('/login', anyUser.logIn);


module.exports = router;