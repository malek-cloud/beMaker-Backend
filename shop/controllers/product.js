const cloudinary = require("../../utils/cloudinary");
const imageDeleter = require("../../utils/deleteImages");
const Product = require("../models/product");
exports.createProduct = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const cloudinaryImage = await cloudinary.uploader.upload(
    req.files.map((file) => file.path)[0],
    { folder: "imagesShop" }
  );
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description,
    images : {
      public_id : cloudinaryImage.public_id,
      url : cloudinaryImage.secure_url
    }
  });
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
  console.log("update start")
  try {
    const product = await Product.findById(req.params.id );
console.log("prod is here")
    if (req.body.name) {
      product.name = req.body.name;
      console.log(" 1 " +  product.name + " : " +  req.body.name );
    }
    if (req.body.description) {
      product.description = req.body.description;
      console.log(" 1 " +  product.description + " : " +  req.body.description );

    }/* 
    if (req.body.category) {
      product.category = req.body.category;
      console.log(" 1 " +  product.category + " : " +  req.body.category );

    } */
    if (req.body.price) {
      product.price = req.body.price;
      console.log(" 1 " +  product.price + " : " +  req.body.price );

    }
    if (req.files[0]) {

      if(product.images.public_id){
        await cloudinary.uploader.destroy(product.images.public_id)
      }
      const cloudinaryImage = await cloudinary.uploader.upload(
        req.files.map((file) => file.path)[0],
        { folder: "imagesShop" }
      );
      product.images = {
        public_id : cloudinaryImage.public_id,
        url : cloudinaryImage.secure_url
      };
    }

    if (!req.files[0]) {
      product.images = product.images;
    }
    await product.save();
    await product.save();
    console.log(" done" );
    console.log(" prod : " + product );

    res.status(204).json({
      message: "this product is updated successfully w  hamdoulillah",
      product,
    });
    console.log("prod is saved")
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
exports.deleteFormation = async (req, res) => {
  try {
    const productId = req.params.id ;
    product = await Product.findById(productId);
   if(product.images){
    await cloudinary.uploader.destroy(product.images.public_id)
  }
   imageDeleter.deleteFile(product.images);
   product.findById(productId).then(element =>{
      if(!element){
        return next(new Error('l9itch Product ya chayty aala rouhy w 3ali m3amal 3lia '));
      }
      
      return Product.deleteOne({ _id: productId });
    }).catch(err=>next(err));
     res.status(200).json({
      message: "this Product was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
};