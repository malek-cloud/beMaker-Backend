const express = require('express');
const MarketingControllers = require('../controllers/marketing');

const router = express.Router();

router.post(
     '/createMarketingImage',
     MarketingControllers.createMarketingImage
 );
 router.get(
  '/MarketingImages',
  MarketingControllers.getMarketingImages
);
router.get(
  '/MarketingImage/:id',
  MarketingControllers.getMarketingImage
);
router.patch(
  '/editMarketingImage/:id',
  MarketingControllers.updateMarketingImage
);
router.delete(
  '/deleteMarketingImage/:id',
  MarketingControllers.deleteMarketingImage
);
module.exports = router;