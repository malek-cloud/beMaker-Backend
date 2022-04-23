const express = require('express');
const { body } = require('express-validator');
const EventsControllers = require('../controllers/événement');

const router = express.Router();

router.post(
     '/createEvent',
    // body('name').trim().isLength({min :2, max : 3000}),
     EventsControllers.createEvent
 );
 router.get(
  '/Events',
  EventsControllers.getEvents
);
router.get(
  '/Event/:id',
  EventsControllers.getEvent
);
router.post(
  '/editEvent/:id',
  EventsControllers.updateEvent
);
router.delete(
  '/deleteEvent/:id',
  EventsControllers.deleteEvent
);
module.exports = router;
