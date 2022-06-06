const express = require('express');
const paymentController = require('../controllers/payment');

const router = express.Router();
router.post(
      '/pay',
      paymentController.pay
    );
    module.exports = router;