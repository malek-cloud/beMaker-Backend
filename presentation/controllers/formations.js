const { body } = require("express-validator");
const Formation = require("../models/formations");
exports.createFormation = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const formation = new Formation({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    field: req.body.field,
    date: req.body.date,
    period: req.body.period,
    prix: req.body.prix,
    animator: req.body.animator,
    feedbacks: req.body.feedbacks,
    images: req.files.map(file => file.path),
  });
  console.log(req.files);
  await Formation.save();
  res.status(200).json({
    message: "finally Formation created w  hamdoulillah",
    formation : formation,
  });
};
exports.getFormations = async (req, res) => {
  const formations = await Formation.find();
  res.status(200).json({
    message: "finally Formations got w  hamdoulillah",
    formations,
    activity : "Formation"
  });
};

exports.getFormation = async (req, res, next) => {
  const formation = await Formation.findOne({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "this Formation is found w  hamdoulillah",
      formation,
    });
  } catch {
    res.status(404);
    res.send({ error: "Formation doesn't exist!" });
  }
};

exports.updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findOne({ _id: req.params.id });

    if (req.body.name) {
      formation.name = req.body.name;
    }

    if (req.body.description) {
      formation.description = req.body.description;
    }
    if (req.body.projects) {
      formation.projects = req.body.projects;
    }

    if (req.files[0]) {
      formation.images = req.files.map(file => file.path);
      console.log("fama modif image " +req.files)
      console.log("hedha el body chouf faama image ou nn " +req.body.name)

    }
    if(!req.files[0]){
      formation.images = formation.images;
      console.log("pas de modif pour l'image " +formation.images)
    }

    await formation.save();
    res.status(200).json({
      message: "this Formation is updated successfully w  hamdoulillah",
      formation,
    });
  } catch(error) {
    res.status(404);
    res.send({ error: "Formation doesn't exist!" });
    console.log(error)
  }
};

exports.deleteFormation = async (req, res) => {
  try {
    await Formation.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "this Formation was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "Formation doesn't exist!" });
  }
};
