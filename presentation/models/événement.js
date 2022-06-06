const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  currentDate: {
    type: String,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  animator: {
    type: String,
  },
});

module.exports = mongoose.model("Event", eventSchema);
