const express = require('express');
const ProductsControllers = require('../controllers/product');

const router = express.Router();

router.post(
     '/createProduct',
     ProductsControllers.createProduct
 );
 router.get(
  '/Products',
  ProductsControllers.getProducts
);
router.get(
  '/Product/:id',
  ProductsControllers.getProduct
);
router.patch(
  '/editProduct/:id',
  ProductsControllers.updateProduct
);
router.delete(
  '/deleteProduct/:id',
  ProductsControllers.deleteProduct
);
module.exports = router;
