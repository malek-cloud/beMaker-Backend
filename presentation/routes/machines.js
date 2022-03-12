const express = require('express');
const { body } = require('express-validator');
const MachinesControllers = require('../controllers/machines');

const router = express.Router();

router.post(
     '/createMachine',
    // body('name').trim().isLength({min :2, max : 3000}),
     MachinesControllers.createMachine
 );
 router.get(
  '/Machines',
  MachinesControllers.getMachines
);
router.get(
  '/Machine/:id',
  MachinesControllers.getMachine
);
router.patch(
  '/editMachine/:id',
  MachinesControllers.updateMachine
);
router.delete(
  '/deleteMachine/:id',
  MachinesControllers.deleteMachine
);
module.exports = router;
