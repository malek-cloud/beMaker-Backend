const { body } = require("express-validator");
const imageDeleter = require("../../utils/deleteImages")
const Formation = require("../models/formations");
exports.createFormation = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const formation = new Formation({
    name: req.body.name,
    age: req.body.age,
    difficulty: req.body.difficulty,
    topics: req.body.topics,
    projects: req.body.projects,
    description: req.body.description,
    location: req.body.location,
    field: req.body.field,
    date: req.body.date,
    period: req.body.period,
    prix: req.body.prix,
    images: req.files.map(file => file.path),
  });
  console.log("wolt 1");

  console.log("hnee zaama " + req.files);
  await formation.save();
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
    if (req.body.field) {
      formation.field = req.body.field;
    }
    if (req.body.location) {
      formation.location = req.body.location;
    }
    if (req.body.prix) {
      formation.prix = req.body.prix;
    }
    if (req.body.period) {
      formation.period = req.body.period;
    }
    if (req.body.date) {
      formation.date = req.body.date;
    }
    if (req.body.description) {
      formation.description = req.body.description;
    }
    if (req.body.age) {
      formation.age = req.body.age;
    }  if (req.body.projects) {
      formation.projects = req.body.projects;
    }
    if (req.body.topics) {
      formation.topics = req.body.topics;
    }
    if (req.body.difficulty) {
      formation.difficulty = req.body.difficulty;
    }

    if (req.files[0]) {
      formation.images = req.files.map(file => file.path);
      console.log("fama modif image " +req.files);

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
    const formationId = req.params.id ;
    Formation.findById(formationId).then(element =>{
      if(!element){
        return next(new Error('l9itch lFormation ya chayty aala rouhy w 3ali m3amal 3lia '));
      }
      imageDeleter.deleteFile(element.images[0])
      return Formation.deleteOne({ _id: formationId });
    }).catch(err=>next(err));
     res.status(200).json({
      message: "this Formation was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "Formation doesn't exist!" });
  }
};
