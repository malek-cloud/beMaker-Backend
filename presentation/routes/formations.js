const express = require('express');
const { body } = require('express-validator');
const FormationsControllers = require('../controllers/formations');

const router = express.Router();

router.post(
     '/createFormation',
    // body('name').trim().isLength({min :2, max : 3000}),
     FormationsControllers.createFormation
 );
 router.get(
  '/Formations',
  FormationsControllers.getFormations
);
router.get(
  '/Formation/:id',
  FormationsControllers.getFormation
);
router.patch(
  '/editFormation/:id',
  FormationsControllers.updateFormation
);
router.delete(
  '/deleteFormation/:id',
  FormationsControllers.deleteFormation
);
module.exports = router;
