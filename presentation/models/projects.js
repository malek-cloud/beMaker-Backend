const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  realisateurs: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
  },
});

module.exports = mongoose.model("Project", projectSchema);
