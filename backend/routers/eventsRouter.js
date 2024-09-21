const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events
router.get('/', eventController.getEvents);

// Get an event by ID
router.get('/:id', eventController.getEventById);

// Create a new event
router.post('/', eventController.createEvent);

// Update an event by ID
router.put('/:id', eventController.updateEvent);

// Delete an event by ID
router.delete('/:id', eventController.deleteEvent);

// Get events by university ID
router.get('/university/:universityId', eventController.getEventsByUniversity);

// Get events by company ID
router.get('/company/:companyId', eventController.getEventsByCompany);

// Get events by location
router.get('/location/:location', eventController.getEventsByLocation);

// Get events by date
router.get('/date/:date', eventController.getEventsByDate);

// Get events by title
router.get('/title/:title', eventController.getEventsByTitle);

// Get events by industry
router.get('/industry/:industry', eventController.getEventsByIndustry);

// Get events by student ID
router.get('/student/:studentId', eventController.getEventsByStudent);

module.exports = router;
