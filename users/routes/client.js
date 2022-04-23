const express = require('express');
const { body } = require('express-validator');

const client = require('../models/client');
const clientController = require('../controllers/client');

const router = express.Router();

router.post(
  '/createClient',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return client.findOne({ email: value }).then(clientDoc => {
          if (clientDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 }),
    body('nom')
      .trim()
      .not()
      .isEmpty()
  ],
  clientController.createClient
);
router.post('/login', clientController.loginClient);
router.get('/employee/:employeeId', clientController.getClient);
module.exports = router;