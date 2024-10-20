const express = require('express');
const router = express.Router();
const anyUser = require('../controllers/anyUserController');

router.post('/signup', anyUser.signUp);

router.post('/login', anyUser.logIn);

router.patch('/updatePassword/:userID', anyUser.updatePassword);

router.post('/logout/:username', anyUser.logout);

router.post('/forgotPassword/:username', anyUser.forgotPassword);

router.post('/resetPassword/:username', anyUser.resetPassword);


module.exports = router;