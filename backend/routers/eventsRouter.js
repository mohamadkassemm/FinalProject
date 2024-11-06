const express = require('express');
const router = express.Router();
const anyUserController = require('../controllers/anyUserController');
const eventController = require('../controllers/eventController');

// Get all events
router.get('/',anyUserController.protect, eventController.getEvents);

// Get an event by ID
router.get('/:id',anyUserController.protect, eventController.getEventById);

// Create a new event
router.post('/',anyUserController.protect, eventController.createEvent);

// Update an event by ID
router.put('/:id',anyUserController.protect, eventController.updateEvent);

// Delete an event by ID
router.delete('/:id',anyUserController.protect, eventController.deleteEvent);

// Get events by university ID
router.get('/university/:universityId',anyUserController.protect, eventController.getEventsByUniversity);

// Get events by company ID
router.get('/company/:companyId',anyUserController.protect, eventController.getEventsByCompany);

// Get events by location
router.get('/location/:location',anyUserController.protect, eventController.getEventsByLocation);

// Get events by date
router.get('/date/:date',anyUserController.protect, eventController.getEventsByDate);

// Get events by title
router.get('/title/:title',anyUserController.protect, eventController.getEventsByTitle);

// Get events by industry
router.get('/industry/:industry',anyUserController.protect, eventController.getEventsByIndustry);

// Get events by student ID
router.get('/student/:studentId',anyUserController.protect, eventController.getEventsByStudent);

module.exports = router;
