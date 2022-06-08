const Order = require("../models/order");
exports.createOrder = async (req, res, next) => {
console.log( req + " el user")
  const order = new Order({
    user: req.body.userId,
    achats: req.body.achats,
    amount: req.body.amount,
    paymentId: req.body.paymentId,
    status: req.body.status,
    region: req.body.region,
    city: req.body.city,
    adress: req.body.adress,
    saved : req.body.saved

  });
  await order.save();
  res.status(200).json({
    message: "finally Order created w  hamdoulillah",
    order,
  });
};
exports.getOrders = async (req, res) => {
  const orders = await Order.find();
  res.status(200).json({
    message: "finally Orders got w  hamdoulillah",
    orders
  });
};
exports.getOrder = async (req, res) => {
  console.log(req.params.id)
  const order = await Order.findById(req.params.id);
  console.log("ty hel el order : "  + order)
  try {
    res.status(200).json({
      message: "this Order is found w  hamdoulillah",
      order,
    });
  } catch {
    res.status(404);
    res.send({ error: "Order doesn't exist!" });
  }
};
exports.updateOrder = async (req, res) => {
  console.log("update start")
  try {
    const order = await Order.findById(req.params.id);
    console.log(req.params.id)
    console.log(order)
console.log("order is here")
console.log("seen ? :" + req.body.seen)
    if (req.body.seen) {
      order.seen = req.body.seen;
    }
    if (req.body.accepted) {
      order.accepted = req.body.accepted;
    }
    await order.save();
    console.log(" done" );
    console.log(" order chenhy : " + order );
    res.status(204).json({
      message: "this Order is updated successfully w  hamdoulillah",
      order,
    });
    console.log("Order is saved")
  } catch {
    res.status(404);
    res.send({ error: "Order doesn't exist!" });
  }
};


