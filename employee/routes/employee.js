const express = require('express');
const EmployeesControllers = require('../controllers/employee');

const router = express.Router();

router.post(
     '/createEmployee',
     EmployeesControllers.createEmployee
 );
 router.get(
  '/Employees',
  EmployeesControllers.getEmployees
);
router.delete(
  '/deleteEmployee/:id',
  EmployeesControllers.deleteEmployee
);
router.post('/login', EmployeesControllers.loginEmployee);
module.exports = router;
