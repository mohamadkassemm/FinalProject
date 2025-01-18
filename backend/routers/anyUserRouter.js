const express = require('express');
const router = express.Router();
const anyUser = require('../controllers/anyUserController');

router.post('/signup', anyUser.signUp);

router.post('/login', anyUser.logIn);

router.post('/completeProfile', anyUser.completeProfile);

router.put('/editProfile/:id', anyUser.updateProfile)

router.patch('/updatePassword/:userID', anyUser.updatePassword);

router.patch('/forgotPassword/', anyUser.forgotPassword);

router.patch('/resetPassword/:token', anyUser.resetPassword);

router.post('/logout/:id', anyUser.logout);

router.get('/role/:id', anyUser.getUserRole);

router.get('/completedStatus', anyUser.isAuthenticated, anyUser.getCompletedStatus)

router.get('/getName/:id', anyUser.getName);

router.get('/data/:id', anyUser.getUserData);

router.get('/loginToken/:id', anyUser.getLoginToken)

module.exports = router;