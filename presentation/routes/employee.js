const express = require('express');
const { body } = require('express-validator');

const employee = require('../models/employee');
const employeeController = require('../controllers/employee');

const router = express.Router();

router.post(
  '/createEmployee',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return employee.findOne({ email: value }).then(employeeDoc => {
          if (employeeDoc) {
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
  employeeController.createEmployee
);
router.post('/login', employeeController.login);
router.get('/employee/:employeeId', employeeController.getEmployee);
module.exports = router;