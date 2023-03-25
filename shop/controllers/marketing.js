const cloudinary = require("../../utils/cloudinary");
const imageDeleter = require("../../utils/deleteImages");
const Marketing = require("../models/marketing");
exports.createMarketingImage = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const cloudinaryImage = await cloudinary.uploader.upload(
    req.files.map((file) => file.path)[0],
    { folder: "imagesShopMarketing" }
  );
  const marketing = new Marketing({
    name: req.body.name,
    images : {
      public_id : cloudinaryImage.public_id,
      url : cloudinaryImage.secure_url
    }
  });
  await marketing.save();
  res.status(200).json({
    message: "finally marketing image created w  hamdoulillah",
    marketing,
  });
};
exports.getMarketingImages = async (req, res) => {
  const marketing = await Marketing.find();
  res.status(200).json({
    message: "finally marketing images got w  hamdoulillah",
    marketing
  });
};

exports.getMarketingImage = async (req, res, next) => {
  const marketing = await Marketing.findById(req.params.id );
  console.log(marketing._id.toString().length + "hedha el long mta id")
  try {
    res.status(200).json({
      message: "this marketing image is found w  hamdoulillah",
      marketing,
    });
  } catch {
    res.status(404);
    res.send({ error: "marketing image doesn't exist!" });
  }
};

exports.updateMarketingImage = async (req, res) => {
  console.log("update start")
  try {
    const marketing = await Marketing.findById(req.params.id );
console.log("prod is here")
    if (req.body.name) {
      marketing.name = req.body.name;
    }
    if (req.files[0]) {

      if(marketing.images.public_id){
        await cloudinary.uploader.destroy(marketing.images.public_id)
      }
      const cloudinaryImage = await cloudinary.uploader.upload(
        req.files.map((file) => file.path)[0],
        { folder: "imagesShopMarketing" }
      );
      marketing.images = {
        public_id : cloudinaryImage.public_id,
        url : cloudinaryImage.secure_url
      };
    }

    if (!req.files[0]) {
      marketing.images = marketing.images;
    }
    await marketing.save();
    await marketing.save();
    console.log(" done" );
    console.log(" prod : " + marketing );

    res.status(204).json({
      message: "this marketing is updated successfully w  hamdoulillah",
      marketing,
    });
    console.log("prod is saved")
  } catch {
    res.status(404);
    res.send({ error: "marketing doesn't exist!" });
  }
};

// exports.deleteMarketingImage = async (req, res) => {
//   try {
//     await Marketing.deleteOne({ _id: req.params.id });
//     res.status(200).json({
//       message: "this marketing was deleted successfully w  hamdoulillah",
//     });
//   } catch {
//     res.status(404);
//     res.send({ error: "marketing doesn't exist!" });
//   }
// };
exports.deleteMarketingImage = async (req, res) => {
  try {
    const marketingId = req.params.id ;
    marketing = await Marketing.findById(marketingId);
    console.log(marketingId);
   if(marketing.images){
    await cloudinary.uploader.destroy(marketing.images.public_id)
  }
   imageDeleter.deleteFile(marketing.images);
   Marketing.findById(marketingId).then(element =>{
      if(!element){
        return next(new Error('l9itch marketing ya chayty aala rouhy w 3ali m3amal 3lia '));
      }
      
      return Marketing.deleteOne({ _id: marketingId });
      
    }).catch(err=>next(err));
     res.status(200).json({
      message: "this marketing was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "marketing doesn't exist!" });
  }
};