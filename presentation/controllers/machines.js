const Machine = require("../models/machines");
exports.createMachine = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }
  const machine = new Machine({
    name: req.body.name,
    description: req.body.description,
    //projects: req.body.projects,
    images: req.files.map(file => file.path),
  });
  console.log(req.files);
  await machine.save();
  res.status(200).json({
    message: "finally machine created w  hamdoulillah",
    machine : machine,
  });
};
exports.getMachines = async (req, res) => {
  const machines = await Machine.find();
  res.status(200).json({
    message: "finally machines got w  hamdoulillah",
    machines,
  });
};

exports.getMachine = async (req, res, next) => {
  const machine = await Machine.findOne({ _id: req.params.id });
  try {
    res.status(200).json({
      message: "this machine is found w  hamdoulillah",
      machine,
    });
  } catch {
    res.status(404);
    res.send({ error: "machine doesn't exist!" });
  }
};

exports.updateMachine = async (req, res) => {
  try {
    const machine = await Machine.findOne({ _id: req.params.id });

    if (req.body.name) {
      machine.name = req.body.name;
    }

    if (req.body.description) {
      machine.description = req.body.description;
    }
    if (req.body.projects) {
      machine.projects = req.body.projects;
    }

    if (req.files) {
      machine.images = req.files.map(file => file.path);
    }

    await machine.save();
    res.status(200).json({
      message: "this machine is updated successfully w  hamdoulillah",
      machine,
    });
  } catch {
    res.status(404);
    res.send({ error: "machine doesn't exist!" });
  }
};

exports.deleteMachine = async (req, res) => {
  try {
    await Machine.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "this machine was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "machine doesn't exist!" });
  }
};
