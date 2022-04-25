const express = require('express');
const { body } = require('express-validator');
const ServicesControllers = require('../controllers/services');

const router = express.Router();

router.post(
     '/createService',
    // body('name').trim().isLength({min :2, max : 3000}),
     ServicesControllers.createService
 );
 router.get(
  '/Services',
  ServicesControllers.getServices
);
router.get(
  '/Service/:id',
  ServicesControllers.getService
);
router.patch(
  '/editService/:id',
  ServicesControllers.updateService
);
router.delete(
  '/deleteService/:id',
  ServicesControllers.deleteService
);
module.exports = router;
