const express = require('express');
const router = express.Router();
const anyUser = require('../controllers/anyUserController');

router.post('/signup', anyUser.signUp);

router.post('/login', anyUser.logIn);

router.post('/completeProfile', anyUser.completeProfile);

router.patch('/updatePassword/:userID', anyUser.updatePassword);

router.patch('/forgotPassword/', anyUser.forgotPassword);

router.patch('/resetPassword/:token', anyUser.resetPassword);

router.post('/logout/:username', anyUser.logout);

router.get('/role', anyUser.isAuthenticated, anyUser.getUserRole);



module.exports = router;