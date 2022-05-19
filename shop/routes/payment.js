const express = require('express');
const paymentController = require('../controllers/payment');

const router = express.Router();
router.get(
      '/pay',
      paymentController.pay
    );
    module.exports = router;