const Product = require("../models/product");
exports.createProduct = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    images: req.files.map(file => file.path),
  });
  console.log(req.files);
  await product.save();
  res.status(200).json({
    message: "finally product created w  hamdoulillah",
    product,
  });
};
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(200).json({
    message: "finally products got w  hamdoulillah",
    products
  });
};

exports.getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id );
  console.log(product._id.toString().length + "hedha el long mta id")
  try {
    res.status(200).json({
      message: "this product is found w  hamdoulillah",
      product,
    });
  } catch {
    res.status(404);
    res.send({ error: "product doesn't exist!" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    if (req.body.name) {
      product.name = req.body.name;
    }
    if (req.body.description) {
      product.description = req.body.description;
    }
    if (req.body.category) {
      product.category = req.body.category;
    }
    if (req.body.price) {
      product.price = req.body.price;
    }
    if (req.files[0]) {
      product.images = req.files.map(file => file.path);

    }
    if(!req.files[0]){
      product.images = product.images;
    }




    await product.save();
    res.status(200).json({
      message: "this product is updated successfully w  hamdoulillah",
      product,
    });
  } catch {
    res.status(404);
    res.send({ error: "product doesn't exist!" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "this product was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "product doesn't exist!" });
  }
};
