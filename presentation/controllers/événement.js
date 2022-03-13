const Event = require("../models/événement");
exports.createEvent = async (req, res, next) => {
  if (!req.files) {
    const error = new Error("No image provided.");
    error.statusCode = 422;
    throw error;
  }

  const event = new Event({
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    animator: req.body.animator,
    date: req.body.date,
    images: req.files.map((file) => file.path),
    location: req.body.location,
  });
  await event.save();
  res.status(200).json({
    message: "finally Event created w  hamdoulillah",
    event,
  });
};
exports.getEvents = async (req, res) => {
  const events = await Event.find();
  res.status(200).json({
    message: "finally Events got w  hamdoulillah",
    events,
    activity: "Event",
  });
};

exports.getEvent = async (req, res, next) => {
  const Event = await Event.findOne({ _id: req.params.id });
  res.status(200).json({
    message: "this Event is found w  hamdoulillah",
    Event,
  });
};

exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id });

    if (req.body.name) {
      event.name = req.body.name;
    }

    if (req.body.description) {
      event.description = req.body.description;
    }
    if (req.body.type) {
      event.type = req.body.type;
    }
    if (req.body.date) {
      event.date = req.body.date;
    }
    if (req.body.location) {
      event.location = req.body.location;
    }
    if (req.body.animator) {
      event.animator = req.body.animator;
    }
    

    if (req.files[0]) {
      event.images = req.files.map((file) => file.path);

    }
    if(!req.files[0]){
      event.images = event.images;
    }




    await Event.save();
    res.status(200).json({
      message: "this Event is updated successfully w  hamdoulillah",
      Event,
    });
  } catch {
    res.status(404);
    res.send({ error: "Event doesn't exist!" });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: "this Event was deleted successfully w  hamdoulillah",
    });
  } catch {
    res.status(404);
    res.send({ error: "Event doesn't exist!" });
  }
};
