const express = require("express");
const OrderControllers = require("../controllers/order");
const router = express.Router();
router.post("/createOrder", OrderControllers.createOrder);
router.get("/Orders", OrderControllers.getOrders);
router.get("/Order/:id", OrderControllers.getOrder);
router.post('/editOrder/:id', OrderControllers.updateOrder );
module.exports = router;