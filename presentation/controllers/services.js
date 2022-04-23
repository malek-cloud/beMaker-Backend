const { body } = require("express-validator");
const services = require("../models/services");
const Service = require("../models/services");
exports.createService = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const service = new Service({
    name: req.body.name,
    description: req.body.description,
    machines : [],

    //projects: req.body.projects,
    images: req.files.map(file => file.path),
  });
  console.log(req.files);
  await service.save();
  res.status(200).json({
    message: "finally Service created w  hamdoulillah",
    service : service,
  });
};
exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.status(200).json({
    message: "finally Services got w  hamdoulillah",
    services,
    activity : "Service"
  });
};

exports.getService = async (req, res, next) => {
  const service = await Service.findOne({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "this Service is found w  hamdoulillah",
      service,
    });
  } catch {
    res.status(404);
    res.send({ error: "Service doesn't exist!" });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findOne({ _id: req.params.id });

    if (req.body.name) {
      service.name = req.body.name;
    }

    if (req.body.description) {
      service.description = req.body.description;
    }
    if (req.body.projects) {
      service.projects = req.body.projects;
    }

    if (req.files[0]) {
      service.images = req.files.map(file => file.path);
      console.log("fama modif image " +req.files)
      console.log("hedha el body chouf faama image ou nn " +req.body.name)

    }
    if(!req.files[0]){
      service.images = service.images;
      console.log("pas de modif pour l'image " +Service.images)
    }

    await service.save();
    res.status(200).json({
      message: "this Service is updated successfully w  hamdoulillah",
      service,
    });
  } catch(error) {
    res.status(404);
    res.send({ error: "Service doesn't exist!" });
    console.log(error)
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "this Service was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "Service doesn't exist!" });
  }
};
