const Project = require("../models/projects");
exports.createProject = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const project = new Project({
    name: req.body.name,
    description: req.body.description,
    realisateurs: req.body.realisateurs,

    images: req.files.map(file => file.path),
  });
  console.log(req.files);
  await project.save();
  res.status(200).json({
    message: "finally project created w  hamdoulillah",
    project,
  });
};
exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.status(200).json({
    message: "finally projects got w  hamdoulillah",
    projects,
  });
};

exports.getProject = async (req, res, next) => {
  const project = await Project.findOne({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "this project is found w  hamdoulillah",
      project,
    });
  } catch {
    res.status(404);
    res.send({ error: "project doesn't exist!" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    if (req.body.name) {
      project.name = req.body.name;
    }

    if (req.body.description) {
      project.description = req.body.description;
    }
    if (req.body.realisateurs) {
      project.realisateurs = req.body.realisateurs;
    }

    if (req.files) {
      project.images = req.files.map(file => file.path);
    }

    await project.save();
    res.status(200).json({
      message: "this project is updated successfully w  hamdoulillah",
      project,
    });
  } catch {
    res.status(404);
    res.send({ error: "project doesn't exist!" });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "this project was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "project doesn't exist!" });
  }
};
