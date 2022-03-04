const express = require('express');
const { body } = require('express-validator');
const fieldsControllers = require('../controllers/fields');

const router = express.Router();

router.post(
     '/createField',
    // body('name').trim().isLength({min :2, max : 3000}),
     fieldsControllers.createField
 );
 router.get(
  '/fields',
  fieldsControllers.getFields
);
router.get(
  '/field/:id',
  fieldsControllers.getField
);
router.patch(
  '/editField/:id',
  fieldsControllers.updateField
);
router.delete(
  '/deleteField/:id',
  fieldsControllers.deleteField
);
module.exports = router;
